import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';
import { Meal } from '@/types';

function genId() { return `meal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(db.getMeals(user.patientId || user.id));
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const meal: Meal = {
    id: genId(),
    userId: user.patientId || user.id,
    name: body.name,
    mealType: body.mealType,
    loggedAt: new Date().toISOString(),
    portion: body.portion || '1 serving',
    ingredients: body.ingredients || [],
    calories: body.calories || 0,
    protein: body.protein || 0,
    carbs: body.carbs || 0,
    fat: body.fat || 0,
    fiber: body.fiber || 0,
    notes: body.notes,
    isAiScanned: body.isAiScanned || false,
    aiConfidence: body.aiConfidence,
    imageUrl: body.imageUrl,
  };
  return NextResponse.json(db.addMeal(meal));
}
