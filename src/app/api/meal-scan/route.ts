import { NextResponse } from 'next/server';
import { analyzeMealImage } from '@/lib/gemini';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = getUserFromRequest(request as never);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { image, sampleName } = body;

    const analysis = await analyzeMealImage(image || sampleName);

    return NextResponse.json({
      success: true,
      analysis,
      disclaimer: 'Nutritional estimates are approximated for nutritional planning and care monitoring. They are not medical diagnoses or exact laboratory measures.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Meal analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
