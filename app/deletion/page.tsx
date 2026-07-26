import { getInboxUrl } from "@/lib/utils";

export default async function DeletionPage({
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
          Check your inbox
        </h1>
        <h2 className="text-emerald-50 text-center text-md md:text-lg">
          We have sent you an email with a link to confirm the deletion of your
          account.
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
