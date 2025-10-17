import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    
    // Vulnerable: No rate limiting or brute force protection
    const user = await db.query.users.findFirst({
      where: eq(users.username, username)
    });

    if (!user) {
      // Vulnerable: Username enumeration through different error message
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Vulnerable: Insecure session management
    const token = Buffer.from(JSON.stringify({ id: user.id, username: user.username })).toString('base64');
    
    const response = NextResponse.json({ 
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email
      },
      token 
    });

    // Vulnerable: No secure cookie flags
    response.cookies.set('auth_token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}