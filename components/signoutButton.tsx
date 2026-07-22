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
      className="bg-emerald-700 text-stone-50 text-sm rounded-sm p-2"
      onClick={signout}
    >
      Signout
    </button>
  );
}
