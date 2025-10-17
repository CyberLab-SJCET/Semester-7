# Security Testing Labs

This repository contains three security testing labs focused on different aspects of web application security:

1. Authentication Testing Lab
2. Identity Management Testing Lab
3. XSS (Cross-Site Scripting) Testing Lab

## Prerequisites

Before starting the labs, ensure you have the following installed:
- Docker
- Docker Compose
- Git

## Lab Environments Setup

### 1. Authentication Testing Lab

Located in `auth-testing-lab/`, this lab focuses on testing various authentication mechanisms.

```bash
cd auth-testing-lab
sudo docker compose up --build
```

The application will be available at `http://localhost:5000`

### 2. Identity Management Testing Lab

Located in `identity_management_testing/`, this lab focuses on testing user identity and access management features.

```bash
cd identity_management_testing
sudo docker compose up --build
```

The application will be available at `http://localhost:3000`

### 3. XSS Testing Lab

Located in `xss/`, this lab focuses on testing Cross-Site Scripting vulnerabilities.

```bash
cd xss
sudo docker compose up --build
```

The application will be available at `http://localhost:8080`

## Lab Structure

### Authentication Testing Lab
- Flask-based web application
- Features multiple authentication scenarios
- Includes password reset and change functionality
- Admin dashboard access control testing

### Identity Management Testing Lab
- Next.js based application
- User role management
- Lab booking system
- API authentication testing
- Access control testing

### XSS Testing Lab
- PHP-based application
- Comment system for XSS testing
- Various XSS vulnerability scenarios

## Notes
- Each lab runs in its own Docker container to prevent interference
- Make sure to stop running containers before switching between labs
- Use `docker-compose down` to stop and remove containers when done
- Check individual lab directories for specific testing instructions
