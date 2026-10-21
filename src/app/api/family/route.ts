import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(db.getFamilyUpdates());
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const update = db.addFamilyUpdate({
    id: `fup-${Date.now()}`,
    authorId: user.id,
    authorName: user.name,
    authorRole: user.role,
    content: body.content,
    category: body.category || 'note',
    createdAt: new Date().toISOString(),
    likes: 0,
  });
  return NextResponse.json(update);
}
