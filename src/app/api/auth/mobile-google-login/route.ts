import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      return NextResponse.json({ message: "Already logged in" }, { status: 200 });
    }

    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: 'Missing Google ID token' }, { status: 400 });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload?.sub;
    const email = payload?.email;
    const name = payload?.name;

    if (!googleId || !email) {
      return NextResponse.json({ message: 'Invalid Google ID token' }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: await bcrypt.hash(randomPassword, 10),
        },
      });
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    console.error('Mobile Google login error:', error);
    return NextResponse.json({ message: 'Something went wrong', status: 500 });
  }
}
