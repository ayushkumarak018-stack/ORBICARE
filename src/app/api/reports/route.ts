import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(db.getMedicalReports(user.patientId || user.id));
}
