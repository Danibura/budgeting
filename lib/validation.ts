import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { transactions } from "@/db/schema";

export const SignupSchema = z.object({
  email: z.email(),
  name: z.string().min(1, "Insert a name"),
  password: z.string().min(8, "Passwords must have at least 8 characters"),
});

export type SignupForm = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const insertTransactionSchema = createInsertSchema(transactions);
export const createTransactionSchema = insertTransactionSchema.omit({
  userId: true,
});
export const selectTransactionSchema = createInsertSchema(transactions);

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type CreateTransaction = z.infer<typeof createTransactionSchema>;
export type Transaction = z.infer<typeof selectTransactionSchema>;
export type TransactionWithOccurrency = Transaction & {
  occurrencyDate?: string;
};
