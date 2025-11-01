# Lab Manual  
**Experiment No:** 1  
**Title:** Security Testing of Authentication Mechanisms in Web Applications  

## Objective  
To identify and exploit common authentication vulnerabilities including default credentials, weak lockout mechanisms, browser cache issues, weak password policies, and insecure password reset functionalities.

---

## 1. Lab Setup & Environment  

**Lab Application Details**  
- **URL:** http://localhost:5000  
- **Technology Stack:** Flask, PostgreSQL, Docker  
- **Purpose:** Deliberately vulnerable web application for security education  

---

## 2. Experiment Procedures  

### TEST 1: Default Credentials Testing  
**Aim:** Identify accessible accounts using common default credentials.

**Procedure:**

echo -e "admin\nuser\ntest\ndemo\nguest\nroot" > users.txt &&
echo -e "admin\npassword\ntest\ndemo\n123456\nletmein" > passwords.txt
Execute Hydra attack

hydra -L users.txt -P passwords.txt -f -V -s 5000 localhost http-post-form "/login:username=^USER^&password=^PASS^:F=Invalid"

text

**Observations:**

| Username | Password | Status  |
|-----------|-----------|---------|
| admin     | admin     | ✅ Success |
| user      | password  | ✅ Success |
| test      | test      | ✅ Success |
| demo      | demo      | ✅ Success |

**Result:** Multiple default credentials provide unauthorized access.

---

### TEST 2: Weak Lockout Mechanism Testing  
**Aim:** Test account lockout policies and brute force protection.

**Procedure:**

hydra -l admin -P /usr/share/wordlists/rockyou.txt -t 10 -W 1 -f -s 5000 localhost http-post-form "/login:username=^USER^&password=^PASS^:F=locked"

text

**Observations:**
- Attempts: 1000+ rapid login attempts  
- Lockout: No account lockout detected  
- Rate Limiting: No throttling observed  
- Duration: Continuous attack possible  

**Result:** Weak lockout mechanism allows unlimited brute force attempts.

---

### TEST 3: Browser Cache Weakness Testing  
**Aim:** Identify improper cache controls on sensitive pages.

**Procedure:**

curl -s -I http://localhost:5000/profile | grep -i "cache-control|pragma|expires" || echo "NO CACHE HEADERS FOUND"

text

**Observations:**
- **Cache-Control Header:** ❌ Absent  
- **Pragma Header:** ❌ Absent  
- **Expires Header:** ❌ Absent  
- **Security Headers:** ❌ Not implemented  

**Manual Verification:**
1. Login → Access `/profile` → Logout  
2. Press browser back button → Cached content accessible  
3. Check Developer Tools → No cache directives  

**Result:** Sensitive pages lack cache control, exposing data after logout.

---

### TEST 4: Weak Password Policy Testing  
**Aim:** Evaluate password complexity requirements.

**Procedure:**

curl -X POST http://localhost:5000/register -d "username=weakuser1&email=weak1@test.com&password=1&confirm_password=1" -s | grep -q "successful" && echo "WEAK PASSWORD ACCEPTED" || echo "WEAK PASSWORD REJECTED"

text

**Observations:**

| Password Length | Accepted | Example    |
|------------------|-----------|------------|
| 1 character      | ✅ Yes    | "1"        |
| 2 characters     | ✅ Yes    | "ab"       |
| 3 characters     | ✅ Yes    | "abc"      |
| Common passwords | ✅ Yes    | "password" |

**Password Policy Analysis:**  
- Minimum Length: 3 characters ❌  
- Complexity: No requirements ❌  
- Dictionary Check: Not implemented ❌  

**Result:** Extremely weak password policy allows easily guessable passwords.

---

### TEST 5: Weak Password Reset Functionality  
**Aim:** Identify vulnerabilities in password recovery mechanism.

**Procedure:**

Test user enumeration

curl -X POST http://localhost:5000/reset_password -d "email=nonexistent@test.com" -s | grep -q "No account found" && echo "USER ENUMERATION POSSIBLE" || echo "NO ENUMERATION"
Test token security

wfuzz -c -z range,00000000-99999999 --hc 404 "http://localhost:5000/reset_password_confirm/FUZZ"

text

**Observations:**

**A. Information Disclosure:**
- Response differentiation for valid/invalid emails  
- Error: "No account found with that email address"  

**B. Reset Token Analysis:**
- Token exposed in response ❌  
- No token expiration ❌  
- Predictable token pattern ❌  

**C. Security Flaws:**
- No rate limiting on reset requests  
- Tokens displayed in clear text  
- No account lockout for reset attempts  

**Result:** Password reset mechanism vulnerable to enumeration and token attacks.

---

## 3. Vulnerability Summary

| Vulnerability | Severity | Impact | Exploitation Complexity |
|----------------|-----------|---------|--------------------------|
| Default Credentials | High | Full system compromise | Low |
| Weak Lockout | High | Account takeover | Low |
| Browser Cache Issues | Medium | Information disclosure | Low |
| Weak Password Policy | Medium | Credential cracking | Low |
| Insecure Password Reset | High | Account takeover | Medium |

---

## 4. Security Recommendations  

### Immediate Actions
1. Change all default credentials.  
2. Implement account lockout after 5 failed attempts.  
3. Add proper cache control headers.  
4. Enforce strong password policy (minimum 8 characters, include complexity).  
5. Secure password reset with time-limited tokens.

### Technical Controls
- Implement HTTPS  
- Add security headers (HSTS, CSP)  
- Use secure session management  
- Conduct regular security audits  

---

## 5. Conclusion  
The lab successfully demonstrated five critical authentication vulnerabilities commonly found in web applications. Each vulnerability was exploitable using standard Kali Linux tools, highlighting the importance of robust authentication mechanisms. The experiment provided hands-on experience in both identifying and understanding the impact of these security flaws.
