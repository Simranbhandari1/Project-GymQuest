import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/config/db';
import User from '@/lib/models/userModel';
import LoginLog from '@/lib/models/LoginLog';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isAdmin = user.email === process.env.ADMIN_EMAIL;

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshTokens.push(refreshToken);
    await user.save();

    // Log login time
    await LoginLog.create({ userId: user._id, loginTime: new Date() });

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        email: user.email,
        name: user.name,
        isAdmin,
      },
    });

    // ✅ Most important: Set 'accessToken' cookie for middleware
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
      sameSite: 'strict',
    });

    // Optional: refreshToken (used for auto-refresh later)
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
