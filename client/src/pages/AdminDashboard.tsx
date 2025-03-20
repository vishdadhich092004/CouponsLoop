import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { RecentCoupons } from "@/components/Dashboard/RecentCoupons";
import { RecentClaims } from "@/components/Dashboard/RecentClaims";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCoupons />
        <RecentClaims />
      </div>
    </div>
  );
}
