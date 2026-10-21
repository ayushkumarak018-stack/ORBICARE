import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { VitalReading } from '@/types';

function genId() { return `vital-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const patientId = user.patientId || user.id;
  return NextResponse.json(db.getVitalReadings(patientId));
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  const UNIT_MAP: Record<string, string> = {
    blood_pressure: 'mmHg',
    heart_rate: 'bpm',
    blood_glucose: 'mg/dL',
    oxygen_saturation: '% SpO2',
    temperature: '°C',
    weight: 'kg',
  };

  // Check alert rules
  const rules = db.getAlertRules(user.patientId || user.id);
  const matchingRule = rules.find((rule) => {
    if (!rule.enabled) return false;
    if (rule.vitalType !== body.type) return false;
    if (rule.condition === 'gt' && body.numericValue > (rule.thresholdMin || 0)) return true;
    if (rule.condition === 'lt' && body.numericValue < (rule.thresholdMin || 0)) return true;
    if (rule.condition === 'between' && body.numericValue >= (rule.thresholdMin || 0) && body.numericValue <= (rule.thresholdMax || 999)) return true;
    return false;
  });

  if (matchingRule) {
    db.addAlert({
      id: `alert-${Date.now()}`,
      userId: user.patientId || user.id,
      title: `${body.type.replace('_', ' ')} Alert`,
      message: matchingRule.message,
      severity: matchingRule.severity,
      vitalType: body.type,
      readingValue: `${body.value} ${UNIT_MAP[body.type] || ''}`,
      triggeredAt: new Date().toISOString(),
      status: 'new',
    });
  }

  const vital: VitalReading = {
    id: genId(),
    userId: user.patientId || user.id,
    type: body.type,
    value: body.value,
    numericValue: body.numericValue,
    secondaryNumericValue: body.secondaryNumericValue,
    unit: UNIT_MAP[body.type] || '',
    recordedAt: new Date().toISOString(),
    context: body.context,
    notes: body.notes,
    isAbnormal: !!matchingRule,
    recordedByName: user.name,
  };
  return NextResponse.json(db.addVitalReading(vital));
}
