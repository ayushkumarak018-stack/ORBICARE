import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { Medication } from '@/types';

// We'll use a simple ID generator since uuid may not be installed
function genId() { return `med-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const patientId = user.patientId || user.id;
  return NextResponse.json(db.getMedications(patientId));
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const med: Medication = {
    id: genId(),
    userId: user.patientId || user.id,
    name: body.name,
    dosage: body.dosage,
    frequency: body.frequency,
    timesOfDay: body.timesOfDay || [],
    instructions: body.instructions,
    prescribingDoctor: body.prescribingDoctor,
    startDate: body.startDate || new Date().toISOString().slice(0, 10),
    status: 'active',
    reminderEnabled: true,
  };
  return NextResponse.json(db.addMedication(med));
}
