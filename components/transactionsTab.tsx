import Link from "next/link";

export default function TransactionsTab() {
  return (
    <Link href="transactions">
      <div className="shadow-md shadow-stone-500/80 rounded-lg bg-stone-50">
        <div className="text-md text-stone-500">Last transactions</div>
      </div>
    </Link>
  );
}
