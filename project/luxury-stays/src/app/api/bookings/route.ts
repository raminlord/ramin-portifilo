import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const bookingsFile = path.join(process.cwd(), 'src', 'data', 'bookings.json');

function readBookings() {
  try {
    if (!fs.existsSync(bookingsFile)) {
      fs.writeFileSync(bookingsFile, '[]', 'utf-8');
    }
    const data = fs.readFileSync(bookingsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBookings(bookings: any[]) {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2), 'utf-8');
}

export async function GET() {
  const bookings = readBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const bookings = readBookings();
  
  const newBooking = {
    id: Date.now().toString(),
    ...body,
    bookingDate: new Date().toLocaleDateString('fa-IR'),
    status: 'pending'
  };
  
  bookings.push(newBooking);
  writeBookings(bookings);
  
  return NextResponse.json(newBooking, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json();
  const bookings = readBookings();
  const index = bookings.findIndex((b: any) => b.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'رزرو یافت نشد' }, { status: 404 });
  }
  
  bookings[index].status = status;
  writeBookings(bookings);
  
  return NextResponse.json(bookings[index]);
}
