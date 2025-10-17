import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { roles } from '@/drizzle/schema';

export async function GET() {
  // Vulnerable endpoint - exposes all role information
  const allRoles = await db.select().from(roles);
  return NextResponse.json({ roles: allRoles });
}