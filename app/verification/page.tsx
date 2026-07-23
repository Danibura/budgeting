import { getInboxUrl } from "@/lib/utils";

import Link from "next/link";

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;
  const inboxUrl = getInboxUrl(email);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-emerald-700">
      <div className="flex flex-col gap-8 items-center p-6 ">
        <h1 className="text-white text-3xl md:text-4xl font-extrabold">
          Thanks for registering!
        </h1>
        <h2 className="text-emerald-50 text-center text-md md:text-lg">
          You will be able to login after opening the verification link we have
          sent you via email.
        </h2>
        <a
          href={inboxUrl}
          className="bg-white text-emerald-700 text-md md:text-lg rounded-sm p-4 shadow-sm shadow-stone-500/50"
        >
          Open Inbox
        </a>
      </div>
    </div>
  );
}
