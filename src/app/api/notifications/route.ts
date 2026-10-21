import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notifications = db.getNotifications(user.id);
  return NextResponse.json(notifications);
}

export async function PUT(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id } = body;

  if (id) {
    db.markNotificationAsRead(id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
}

export async function POST(request: Request) {
  const user = getUserFromRequest(request as never);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Mark all as read
  db.markAllNotificationsAsRead(user.id);
  return NextResponse.json({ success: true });
}
