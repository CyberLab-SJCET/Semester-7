import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({ users: allUsers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;
    const data = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Vulnerable: No role validation or authorization check
    const updatedUser = await db
      .update(users)
      .set(data)
      .where(eq(users.id, parseInt(userId)))
      .returning();

    return NextResponse.json({ user: updatedUser[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Vulnerable: No authorization check for user deletion
    await db
      .delete(users)
      .where(eq(users.id, parseInt(userId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}