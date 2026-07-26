import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignoutButton from "@/components/signoutButton";
import DeleteAccount from "@/components/deleteAccount";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  async function signout() {
    await auth.api.signOut();
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full max-w-xl px-8">
        <img
          src={session.user.image ?? "/defaultPFP.jpg"}
          alt="Profile image"
          className="w-20 h-20 rounded-full mt-20"
        />
        <h1 className="mt-5 font-semibold text-2xl">{session.user.name}</h1>
        <h2 className=" text-md text-stone-500">{session.user.email}</h2>
        <div className="flex flex-col items-center w-full mt-10 gap-5">
          <Link
            href="privacyPolicy"
            className="p-4 rounded-sm border border-stone-500 w-full cursor-pointer"
          >
            Terms of service
          </Link>

          <Link
            href="privacyPolicy"
            className="p-4 rounded-sm border border-stone-500 w-full cursor-pointer"
          >
            Privacy policy
          </Link>

          <SignoutButton />
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
