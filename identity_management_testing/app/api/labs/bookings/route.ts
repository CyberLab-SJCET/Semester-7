import { NextResponse } from 'next/server';
import { db } from '@/drizzle';
import { labBookings } from '@/drizzle/schema';

export async function GET(req: Request) {
  try {
    // Vulnerable: No authentication or authorization
    const bookings = await db.select().from(labBookings);
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ensure dates are properly handled
    const bookingData = {
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      status: 'pending',
      // No validation on purpose - vulnerable by design
      labId: parseInt(body.labId)
    };

    const newBooking = await db.insert(labBookings).values(bookingData).returning();
    return NextResponse.json({ booking: newBooking[0] });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}