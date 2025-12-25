import { sql } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { user } from './auth-schema';

export const waterIntakes = mysqlTable('water_intakes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  amountMl: int('amount_ml').notNull(),
  goalAtTimeMl: int('goal_at_time_ml').notNull(),
  recordedAt: timestamp('recorded_at', { fsp: 3 }).notNull(),
  createdAt: timestamp('created_at', { fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const userGoals = mysqlTable('user_goals', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  dailyGoalMl: int('daily_goal_ml').notNull(),
  createdAt: timestamp('created_at', { fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});
