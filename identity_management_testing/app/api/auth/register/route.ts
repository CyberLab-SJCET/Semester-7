import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';

export async function POST(req: Request) {
  try {
    const { username, password, email } = await req.json();

    // Intentionally weak validation
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await db.insert(users).values({
      username,
      password, // Intentionally storing plain text password
      email,
      role: 'user'
    }).returning();

    return NextResponse.json({ user: user[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}