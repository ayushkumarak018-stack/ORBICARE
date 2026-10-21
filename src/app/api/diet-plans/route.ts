import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const patientId = user.patientId || user.id;
  const dietPlans = db.getDietPlans(patientId);
  return NextResponse.json(dietPlans);
}

export async function PUT(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { planId, mealId, completed } = body;

  if (!planId || !mealId) {
    return NextResponse.json({ error: 'planId and mealId are required' }, { status: 400 });
  }

  const success = db.updateDietPlanMeal(planId, mealId, Boolean(completed));
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Failed to update diet plan meal' }, { status: 404 });
}
