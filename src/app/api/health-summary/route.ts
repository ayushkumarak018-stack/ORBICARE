import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { generateHealthSummary } from '@/lib/gemini';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request as never);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const patientId = user.patientId || user.id;
    const patientUser = db.getUserById(patientId) || user;
    const vitals = db.getVitalReadings(patientId);
    const logs = db.getMedicationLogs(patientId);

    // Calculate vital statistics
    const bpReadings = vitals.filter(v => v.type === 'blood_pressure');
    const avgSystolic = bpReadings.length > 0
      ? Math.round(bpReadings.reduce((sum, v) => sum + v.numericValue, 0) / bpReadings.length)
      : 124;
    const avgDiastolic = bpReadings.length > 0
      ? Math.round(bpReadings.reduce((sum, v) => sum + (v.secondaryNumericValue || 80), 0) / bpReadings.length)
      : 80;

    const glucoseReadings = vitals.filter(v => v.type === 'blood_glucose');
    const avgGlucose = glucoseReadings.length > 0
      ? Math.round(glucoseReadings.reduce((sum, v) => sum + v.numericValue, 0) / glucoseReadings.length)
      : 110;

    const takenLogs = logs.filter(l => l.status === 'taken');
    const adherenceRate = logs.length > 0 ? Math.round((takenLogs.length / logs.length) * 100) : 95;

    const summary = generateHealthSummary(
      patientUser.name,
      vitals.length,
      adherenceRate,
      avgSystolic,
      avgDiastolic,
      avgGlucose
    );

    return NextResponse.json({
      success: true,
      summary,
      metrics: {
        patientName: patientUser.name,
        adherenceRate,
        avgSystolic,
        avgDiastolic,
        avgGlucose,
        totalVitalsLogged: vitals.length,
        totalMedicationsActive: db.getMedications(patientId).length,
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate health summary';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
