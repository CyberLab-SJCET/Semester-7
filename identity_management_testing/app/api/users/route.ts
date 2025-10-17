import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';
import { like } from 'drizzle-orm';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || '';

  // Vulnerable endpoint - allows user enumeration
  const matchingUsers = await db.select({
    id: users.id,
    username: users.username,
    email: users.email,
    role: users.role
  })
  .from(users)
  .where(like(users.username, `%${username}%`));

  return NextResponse.json({ users: matchingUsers });
}

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    
    // Vulnerable: No input validation or role verification
    const newUser = await db.insert(users).values(userData).returning();
    
    return NextResponse.json({ user: newUser[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}