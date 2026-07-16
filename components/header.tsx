import Link from "next/link";

export default function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row p-2 border-b border-emerald-600 w-full text-emerald-600">
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/`}
        className="material-symbols-rounded  absolute l-2 t-2"
      >
        home
      </Link>
      <div className="flex flex-row justify-center w-full">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
