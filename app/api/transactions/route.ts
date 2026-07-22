import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { InsertTransaction } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  let resultArray;
  if (limit)
    resultArray = await db.select().from(transactions).limit(Number(limit));
  else resultArray = await db.select().from(transactions);

  return Response.json(resultArray);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) return Response.json({ error: "Unauthorized" });
  const userId = session.user.id;

  const body = await request.json();
  const values: InsertTransaction = {
    type: body.type as "income" | "outcome",
    category: body.category,
    description: body.description,
    amount: Number(body.amount),
    date: body.date,
    recurring: Boolean(body.recurring),
    frequency: body.frequency,
    endDate: body.endDate,
    userId: userId,
  };

  const result = await db.insert(transactions).values(values).returning();

  revalidatePath("/");
  revalidatePath("/transactions");
  revalidatePath("/savings");
  revalidatePath("inOut");
  return Response.json(result);
}

export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) return Response.json({ error: "Unauthorized" });
  const userId = session.user.id;

  const body = await request.json();
  const values: InsertTransaction = {
    type: body.type as "income" | "outcome",
    category: body.category,
    description: body.description,
    amount: Number(body.amount),
    date: body.date,
    recurring: Boolean(body.recurring),
    frequency: body.frequency,
    endDate: body.endDate ?? null,
    userId: userId,
  };

  const result = await db
    .update(transactions)
    .set(values)
    .where(eq(transactions.id, Number(body.id)));

  revalidatePath("/");
  revalidatePath("/transactions");
  revalidatePath("/savings");
  revalidatePath("inOut");
  return Response.json(result);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const result = await db
    .delete(transactions)
    .where(eq(transactions.id, body.id))
    .returning();

  revalidatePath("/");
  revalidatePath("/transactions");
  revalidatePath("/savings");
  revalidatePath("inOut");
  return Response.json(result);
}
