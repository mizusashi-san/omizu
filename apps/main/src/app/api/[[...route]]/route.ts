import { randomUUID } from 'node:crypto';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/db/auth';
import { userGoals, waterIntakes } from '@/db/schema/water-schema';

const app = new Hono();

app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  });
});

const createIntakeSchema = z.object({
  amount_ml: z.number().int().min(1).max(10000),
});

app.post(
  '/water-intakes',
  zValidator('json', createIntakeSchema),
  async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session?.user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { amount_ml } = c.req.valid('json');

    const userGoal = await db.query.userGoals.findFirst({
      where: eq(userGoals.userId, session.user.id),
    });

    const goalAtTimeMl = userGoal?.dailyGoalMl ?? 2000;

    const id = randomUUID();
    const recordedAt = new Date();

    await db.insert(waterIntakes).values({
      id,
      userId: session.user.id,
      amountMl: amount_ml,
      goalAtTimeMl,
      recordedAt,
    });

    return c.json({
      id,
      amount_ml,
      recorded_at: recordedAt.toISOString(),
    });
  },
);

export const GET = handle(app);
export const POST = handle(app);
