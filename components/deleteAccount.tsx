"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function DeleteAccount() {
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = authClient.useSession();

  async function handleDelete() {
    await authClient.deleteUser({
      callbackURL: "/login",
    });
    redirect(`/deletion?email=${session?.user.email}`);
  }

  return (
    <div className="w-full">
      {showPopup && (
        <div>
          <div className="fixed inset-0 bg-gray-400/50 rounded-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col gap-4">
              <h3 className="text-xl font-bold">
                Are you sure you want to delete your account?
              </h3>
              <h4>
                This action can't be undone and will permanently delete your
                data.
              </h4>
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  className=" text-red-50 text-md py-1.5 px-2 rounded-sm mt-4 shadow-sm shadow-stone-500/50 cursor-pointer bg-red-700"
                >
                  Delete
                </button>
                <button
                  className="text-emerald-50 text-md py-1.5 px-2 rounded-sm mt-4 shadow-sm shadow-stone-500/50 cursor-pointer bg-emerald-700"
                  onClick={() => setShowPopup(false)}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        className="p-4 rounded-sm border border-stone-500 w-full text-left text-red-500 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        Delete account
      </button>
    </div>
  );
}
