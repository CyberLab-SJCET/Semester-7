from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt
import os
from datetime import datetime, timedelta
import secrets

app = Flask(__name__)
app.config['SECRET_KEY'] = 'weak-secret-key-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin123@database/authlab'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=365)  # Too long session

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    failed_attempts = db.Column(db.Integer, default=0)
    locked_until = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.String(20), default='user')
    reset_token = db.Column(db.String(100), nullable=True)

    def set_password(self, password):
        # Weak hashing - using basic method
        self.password_hash = generate_password_hash(password, method='md5')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

DEFAULT_CREDENTIALS = [
    {'username': 'admin', 'password': 'admin', 'role': 'admin'},
    {'username': 'user', 'password': 'password', 'role': 'user'},
    {'username': 'test', 'password': 'test', 'role': 'user'},
    {'username': 'demo', 'password': 'demo', 'role': 'user'}
]

failed_attempts = {}

def initialize_database():
    """Initialize database with default users"""
    with app.app_context():
        db.create_all()
        for cred in DEFAULT_CREDENTIALS:
            if not User.query.filter_by(username=cred['username']).first():
                user = User(username=cred['username'], email=f"{cred['username']}@example.com", role=cred['role'])
                user.set_password(cred['password'])
                db.session.add(user)
        db.session.commit()
        print("✅ Database initialized with default users")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        remember = bool(request.form.get('remember'))
        
        user = User.query.filter_by(username=username).first()
        
        # Weak lockout mechanism - global variable based
        if username in failed_attempts and failed_attempts[username] >= 5:
            flash('Account temporarily locked. Try again later.', 'error')
            return render_template('login.html')
        
        if user and user.check_password(password):
            # Reset failed attempts
            if username in failed_attempts:
                failed_attempts[username] = 0
            
            login_user(user, remember=remember)
            
            # Set long-lasting cookie
            resp = make_response(redirect(url_for('dashboard')))
            if remember:
                resp.set_cookie('remember_token', 'weak_token', max_age=31536000)  # 1 year
                
            flash('Login successful!', 'success')
            return resp
        else:
            # Increment failed attempts
            failed_attempts[username] = failed_attempts.get(username, 0) + 1
            flash('Invalid credentials', 'error')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Weak password policy
        if len(password) < 3:  # Very weak requirement
            flash('Password must be at least 3 characters', 'error')
            return render_template('register.html')
        
        if password != confirm_password:
            flash('Passwords do not match', 'error')
            return render_template('register.html')
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists', 'error')
            return render_template('register.html')
        
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@app.route('/change_password', methods=['GET', 'POST'])
@login_required
def change_password():
    if request.method == 'POST':
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        
        # Weak validation
        if not current_user.check_password(current_password):
            flash('Current password is incorrect', 'error')
            return render_template('change_password.html')
        
        if new_password != confirm_password:
            flash('New passwords do not match', 'error')
            return render_template('change_password.html')
        
        # No proper password strength check
        current_user.set_password(new_password)
        db.session.commit()
        
        flash('Password changed successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('change_password.html')

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        
        # Information disclosure vulnerability
        if not user:
            flash('No account found with that email address', 'error')
            return render_template('reset_password.html')
        
        # Weak token generation
        reset_token = secrets.token_hex(16)
        user.reset_token = reset_token
        db.session.commit()
        
        # In real app, send email. Here we'll display it for testing
        flash(f'Reset token: {reset_token} (In production, this would be sent via email)', 'info')
        return render_template('reset_confirm.html', token=reset_token)
    
    return render_template('reset_password.html')

@app.route('/reset_password_confirm/<token>', methods=['GET', 'POST'])
def reset_password_confirm(token):
    user = User.query.filter_by(reset_token=token).first()
    
    if not user:
        flash('Invalid or expired reset token', 'error')
        return redirect(url_for('reset_password'))
    
    if request.method == 'POST':
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        
        if new_password != confirm_password:
            flash('Passwords do not match', 'error')
            return render_template('reset_password_confirm.html', token=token)
        
        # Weak: No validation of token expiration
        user.set_password(new_password)
        user.reset_token = None
        db.session.commit()
        
        flash('Password reset successfully! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('reset_password_confirm.html', token=token)

@app.route('/admin')
@login_required
def admin_panel():
    # Weak authorization check
    if current_user.role != 'admin':
        flash('Access denied', 'error')
        return redirect(url_for('dashboard'))
    
    users = User.query.all()
    return render_template('admin.html', users=users)

@app.route('/profile')
@login_required
def profile():
    # No cache control headers
    return render_template('profile.html', user=current_user)

# Initialize database when app starts
initialize_database()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
