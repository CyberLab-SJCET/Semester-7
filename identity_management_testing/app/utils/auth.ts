export interface AuthResponse {
  token?: string;
  user?: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  error?: string;
}

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

export async function logout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    removeAuthToken();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export function isAuthenticated() {
  return !!getAuthToken();
}

export async function checkAuth() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}