import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { labs } from '@/drizzle/schema';

export async function GET(req: Request) {
  try {
    const allLabs = await db.select().from(labs);
    return NextResponse.json({ labs: allLabs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch labs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ensure equipment is properly handled as a JSON array
    const labData = {
      ...body,
      equipment: Array.isArray(body.equipment) ? body.equipment : [],
      lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : new Date(),
      nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      currentOccupancy: 0
    };

    const newLab = await db.insert(labs).values(labData).returning();
    return NextResponse.json({ lab: newLab[0] });
  } catch (error) {
    console.error('Lab creation error:', error);
    return NextResponse.json({ error: 'Failed to create lab' }, { status: 500 });
  }
}