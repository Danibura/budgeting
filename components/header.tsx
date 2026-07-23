import Link from "next/link";
import SignoutButton from "./signoutButton";

export default function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row px-3 py-2 justify-between items-center  w-full text-emerald-700 bg-white">
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/`}
        className="material-symbols-rounded  "
      >
        home
      </Link>

      <h1>{title}</h1>

      <SignoutButton />
    </div>
  );
}
