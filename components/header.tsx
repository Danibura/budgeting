import Link from "next/link";

export default function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row p-3  border-emerald-600 w-full text-emerald-600 bg-white">
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/`}
        className="material-symbols-rounded  absolute l-3 t-3"
      >
        home
      </Link>
      <div className="flex flex-row justify-center w-full">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
