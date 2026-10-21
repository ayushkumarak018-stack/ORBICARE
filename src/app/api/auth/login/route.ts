import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db/storage';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = db.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. User not found.' },
        { status: 401 }
      );
    }

    // Check user password hash or demo password 'orbicare123'
    const isMatch = password === 'orbicare123' || (user.passwordHash && bcrypt.compareSync(password, user.passwordHash));
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials. Incorrect password.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    const profile = db.getProfileByUserId(user.id);

    const response = NextResponse.json({
      success: true,
      user: { ...user, profile },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
