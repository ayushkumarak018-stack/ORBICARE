import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { MedicationLog } from '@/types';

function genId() { return `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const patientId = user.patientId || user.id;
  return NextResponse.json(db.getMedicationLogs(patientId));
}

export async function PATCH(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { logId, status, recordedAt } = await request.json();
  const log = db.getMedicationLogs(user.patientId || user.id).find((l) => l.id === logId);
  if (!log) return NextResponse.json({ error: 'Log not found' }, { status: 404 });
  const updated = db.addOrUpdateMedicationLog({ ...log, status, recordedAt, recordedByName: user.name });
  return NextResponse.json(updated);
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const log: MedicationLog = {
    id: genId(),
    medicationId: body.medicationId,
    medicationName: body.medicationName,
    userId: user.patientId || user.id,
    scheduledTime: body.scheduledTime,
    status: body.status || 'pending',
    notes: body.notes,
    recordedByName: user.name,
  };
  return NextResponse.json(db.addOrUpdateMedicationLog(log));
}
