import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const key = `views:post:${slug}`;

    if (process.env.NODE_ENV !== 'production') {
      const count = (await redis.get<number>(key)) ?? 0;
      return NextResponse.json({ count });
    }

    const cookieStore = await cookies();
    const cookieName = `viewed_${slug}`;
    const alreadyViewed = cookieStore.get(cookieName);

    if (alreadyViewed) {
      const count = (await redis.get<number>(key)) ?? 0;
      return NextResponse.json({ count });
    }

    const count = await redis.incr(key);

    const now = new Date();
    const midnight = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
    );
    const secondsUntilMidnight = Math.floor(
      (midnight.getTime() - now.getTime()) / 1000,
    );

    const response = NextResponse.json({ count });
    response.cookies.set(cookieName, '1', {
      maxAge: secondsUntilMidnight,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
    return response;
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const count = (await redis.get<number>(`views:post:${slug}`)) ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
