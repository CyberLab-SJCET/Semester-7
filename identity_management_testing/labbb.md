# Security Testing Tools Documentation

## EXP 5: SQL Injection Testing

### 1. Login Bypass Testing
- **Payload Source**: GitHub SQL injection payload repository
- **Target**: Test website login form
- **Method**: 
  - Access payload lists from security testing repositories
  - Use payloads in login forms on authorized test environments
  - Monitor for authentication bypass vulnerabilities

### 2. SQLMap
```bash
sqlmap -u "URL_WITH_PARAMETER" --dump
```
- **Purpose**: Automated SQL injection detection and exploitation
- **Usage**: Tests URL parameters for SQL injection vulnerabilities
- **Output**: Dumps database contents if vulnerabilities are found

### 3. Burp Suite
- **Workflow**:
  - Capture HTTP requests through proxy
  - Send requests to Intruder module
  - Configure payload positions
  - Use SQL injection payloads for testing
  - Analyze responses for vulnerabilities

---

## EXP 3: Hydra (Password Testing)

```bash
sudo systemctl start vsftpd
hydra -l username -P passlist ftp://ipaddress
```
- **Purpose**: Network login credential testing
- **Parameters**:
  - `-l`: Specify username
  - `-P`: Path to password list file
  - Protocol and target IP address

---

## EXP: OWASP ZAP (Web Application Scanner)

### Configuration Steps:
1. **Firefox Proxy Setup**:
   - Navigate to Settings → Network Settings
   - Manual proxy configuration
   - HTTP Proxy: `127.0.0.1`
   - Port: `8080`

2. **Scanning Methods**:
   - **Passive Scan**: Monitors browsing traffic
   - **Active Scan**: Actively tests for vulnerabilities
   - **Spider**: Crawls website structure

---

## EXP: Recon-ng (Reconnaissance Framework)

```bash
recon-ng
workspaces create <workspace_name>
modules load recon/domains-hosts/brute_hosts
options set SOURCE <domain.com>
run
show hosts
```

- **Purpose**: Information gathering and reconnaissance
- **Features**: Modular framework for collecting domain information
- **Installation**: Use `marketplace install` for missing modules

---

## WPScan (WordPress Security Scanner)

```bash
wpscan --url "URL" --api-token=<token>
```
- **Purpose**: WordPress vulnerability scanner
- **Function**: Detects WordPress core, plugin, and theme vulnerabilities
- **API Token**: Required for accessing vulnerability database

---

## ⚠️ Important Legal Notice

These tools are **security testing tools** that should **ONLY** be used:
- On systems you own
- On systems where you have explicit written authorization
- In authorized penetration testing engagements
- In controlled lab environments with test websites

**Unauthorized testing of systems you don't own is illegal** and may violate computer fraud and abuse laws in your jurisdiction.
