"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function SignoutButton() {
  const router = useRouter();
  async function signout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="p-4 rounded-sm border border-stone-500 w-full text-left cursor-pointer"
      onClick={signout}
    >
      Signout
    </button>
  );
}
