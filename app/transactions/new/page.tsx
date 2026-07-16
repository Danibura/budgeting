import Header from "@/components/header";
import TransactionForm from "@/components/transactionForm";

export default function NewTransactionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="New transaction"></Header>
      <div className="bg-stone-100 flex-1">
        <TransactionForm />
      </div>
    </div>
  );
}
