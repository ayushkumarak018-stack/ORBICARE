import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { Appointment } from '@/types';

function genId() { return `appt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(db.getAppointments(user.patientId || user.id));
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const appt: Appointment = {
    id: genId(),
    userId: user.patientId || user.id,
    doctorName: body.doctorName,
    specialty: body.specialty,
    clinicOrHospital: body.clinicOrHospital,
    appointmentDate: body.appointmentDate,
    appointmentTime: body.appointmentTime,
    locationType: body.locationType || 'in_person',
    addressOrLink: body.addressOrLink,
    notes: body.notes,
    status: 'upcoming',
    sharedWithFamily: body.sharedWithFamily !== false,
  };
  return NextResponse.json(db.addAppointment(appt));
}
