import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const visited = cookieStore.get("visited");
    const today = new Date().toISOString().slice(0, 10);
    const todayKey = `visits:${today}`;

    if (process.env.NODE_ENV !== "production") {
      const [total, todayCount] = await Promise.all([
        redis.get<number>("visits:total"),
        redis.get<number>(todayKey),
      ]);
      return NextResponse.json({
        today: todayCount ?? 0,
        total: total ?? 0,
      });
    }

    if (!visited) {
      const pipeline = redis.pipeline();
      pipeline.incr("visits:total");
      pipeline.incr(todayKey);
      const results = await pipeline.exec();

      await redis.expire(todayKey, 60 * 60 * 48);

      const total = results[0] as number;
      const todayCount = results[1] as number;

      const now = new Date();
      const midnight = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
      );
      const secondsUntilMidnight = Math.floor(
        (midnight.getTime() - now.getTime()) / 1000,
      );

      const response = NextResponse.json({ today: todayCount, total });
      response.cookies.set("visited", "1", {
        maxAge: secondsUntilMidnight,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });

      return response;
    }

    const [total, todayCount] = await Promise.all([
      redis.get<number>("visits:total"),
      redis.get<number>(todayKey),
    ]);

    return NextResponse.json({
      today: todayCount ?? 0,
      total: total ?? 0,
    });
  } catch {
    return NextResponse.json({ today: 0, total: 0 });
  }
}
