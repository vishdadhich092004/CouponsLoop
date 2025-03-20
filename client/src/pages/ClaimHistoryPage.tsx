import { ClaimHistoryTable } from "@/components/Dashboard/ClaimHistoryTable";

export default function ClaimHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Claim History</h1>
      <ClaimHistoryTable />
    </div>
  );
}
