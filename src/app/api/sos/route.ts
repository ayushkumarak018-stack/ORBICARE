import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { EmergencyEvent } from '@/types';

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const contacts = db.getEmergencyContacts();
  const event: EmergencyEvent = {
    id: `sos-${Date.now()}`,
    userId: user.id,
    patientName: user.name,
    triggeredAt: new Date().toISOString(),
    status: 'active',
    alertedContacts: contacts.slice(0, 3).map((c) => ({ name: c.name, phone: c.phone, status: 'dispatched' })),
    locationNotes: 'Home location · GPS coordinates dispatched to emergency contacts',
    dispatchHelpline: '108 (National Ambulance)',
  };
  const result = db.triggerEmergencySOS(event);
  return NextResponse.json(result);
}
