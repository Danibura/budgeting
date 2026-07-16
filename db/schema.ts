import {
  pgTable,
  integer,
  serial,
  text,
  boolean,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("type", ["income", "outcome"]);
export const frequencyEnum = pgEnum("frequency", [
  "daily",
  "monthly",
  "annually",
]);

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  type: typeEnum().notNull(),
  category: text().notNull(),
  description: text(),
  amount: integer().notNull(),
  date: date().defaultNow().notNull(),
  recurring: boolean().default(false).notNull(),
  frequency: frequencyEnum(),
  endDate: date(),
});
