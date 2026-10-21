import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = getUserFromRequest(request as never);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Reset database to initial pristine demo state
    db.resetDemoData();

    return NextResponse.json({
      success: true,
      message: 'Demonstration environment successfully reset to default clinical baseline.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Reset failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
