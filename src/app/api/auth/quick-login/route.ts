import { NextResponse } from 'next/server';
import { db } from '@/db/storage';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { role, userId } = await request.json();

    let targetUser = userId ? db.getUserById(userId) : null;
    if (!targetUser && role) {
      targetUser = db.getUsers().find(u => u.role === role);
    }
    if (!targetUser) {
      targetUser = db.getUserById('user-ramakant-01');
    }

    if (!targetUser) {
      return NextResponse.json({ error: 'Persona not found' }, { status: 404 });
    }

    const token = createSessionToken(targetUser);
    const profile = db.getProfileByUserId(targetUser.id);

    const response = NextResponse.json({
      success: true,
      user: { ...targetUser, profile },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Quick login failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
