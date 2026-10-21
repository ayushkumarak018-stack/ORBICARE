import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/db/storage';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { User, UserProfile, UserRole } from '@/types';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['elderly', 'family', 'caregiver', 'doctor'] as const),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  relationshipToPatient: z.string().optional(),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0]?.message || 'Invalid input data' },
        { status: 400 }
      );
    }

    const { name, email, password, role, phone, city, state, relationshipToPatient, bloodGroup, allergies, chronicConditions } = validated.data;

    // Check existing
    const existing = db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const userId = `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const passwordHash = bcrypt.hashSync(password, 10);
    const patientId = role === 'elderly' ? userId : 'user-ramakant-01';

    const newUser: User = {
      id: userId,
      name,
      email,
      role: role as UserRole,
      phone: phone || '',
      city: city || 'New Delhi',
      state: state || 'Delhi',
      patientId,
      relationshipToPatient: relationshipToPatient || (role === 'elderly' ? 'Self' : 'Family Member'),
      passwordHash,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f766e&color=fff&size=150`,
    };

    db.addUser(newUser);

    // Create user profile
    const profile: UserProfile = {
      id: `profile-${userId}`,
      userId,
      bloodGroup: bloodGroup || (role === 'elderly' ? 'B+' : undefined),
      allergies: allergies ? allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
      chronicConditions: chronicConditions ? chronicConditions.split(',').map(s => s.trim()).filter(Boolean) : [],
      textSizePreference: 'normal',
      highContrast: false,
    };

    db.updateProfile(userId, profile);

    // Welcome in-app notification
    db.addNotification({
      id: `notif-welcome-${Date.now()}`,
      userId,
      title: 'Welcome to OrbiCare',
      message: `Hello ${name}! Your ${role} profile has been initialized. Explore medication routines, vital logging, and family coordination.`,
      category: 'system',
      linkUrl: '/dashboard',
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    const token = createSessionToken(newUser);
    const response = NextResponse.json({
      success: true,
      user: { ...newUser, profile },
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
    const message = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
