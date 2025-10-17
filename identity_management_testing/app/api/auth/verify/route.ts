import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Vulnerable: No proper token validation or signature verification
    const token = authHeader.split(' ')[1];
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      return NextResponse.json({ valid: true, user: decoded });
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}