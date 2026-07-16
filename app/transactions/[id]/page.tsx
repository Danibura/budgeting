export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}
