import TransactionsTab from "@/components/transactionsTab";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans">
      <Header title="Home"></Header>
      <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans ">
        <TransactionsTab />
      </div>
    </div>
  );
}
