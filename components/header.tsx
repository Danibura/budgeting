import Link from "next/link";
import SignoutButton from "./signoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Header({ title }: { title: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <div className="flex flex-row px-3 py-2 justify-between items-center  w-full text-emerald-700 bg-white">
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/`}
        className="material-symbols-rounded  "
      >
        home
      </Link>

      <h1>{title}</h1>

      <Link href="/profile">
        <img
          src={session.user.image ?? "/defaultPFP.jpg"}
          alt="Profile image"
          className="w-10 h-10 rounded-full"
        />
      </Link>
    </div>
  );
}
