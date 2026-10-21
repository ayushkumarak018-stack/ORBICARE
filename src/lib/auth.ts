import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { db } from '@/db/storage';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'orbicare-secure-jwt-secret-key-elderly-care-2026';
const COOKIE_NAME = 'orbicare_session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function createSessionToken(user: User): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUserFromCookies(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    // Default fallback to Elderly persona if no cookie set yet during preview
    const defaultUser = db.getUserById('user-ramakant-01');
    return defaultUser || null;
  }
  const payload = verifySessionToken(token);
  if (!payload) return null;
  const user = db.getUserById(payload.userId);
  return user || null;
}

export function getUserFromRequest(req: NextRequest): User | null {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifySessionToken(token);
  if (!payload) return null;
  return db.getUserById(payload.userId) || null;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
