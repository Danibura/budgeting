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

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  recurring: boolean().default(false),
  type: typeEnum().notNull(),
  category: text().notNull(),
  description: text().notNull(),
  amount: integer().notNull(),
  date: date().defaultNow(),
});
