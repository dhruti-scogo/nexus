import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDailySummary,
  getMonthlyComparison,
  getSummary,
  getTopDomains,
  getWeeklyComparison,
  getAllUsers,
} from "@/lib/api";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { RestrictionsManager } from "@/components/restrictions-manager";
import {
  DailySummaryData,
  DomainData,
  MonthlyComparisonData,
  SummaryData,
  UserListData,
  WeeklyComparisonData,
} from "@/lib/types";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/auth/login");
  }

  let summary: SummaryData | undefined;
  let topDomains: DomainData[] | undefined;
  let dailySummary: DailySummaryData[] | undefined;
  let weeklyComparison: WeeklyComparisonData | undefined;
  let monthlyComparison: MonthlyComparisonData | undefined;
  let userList: UserListData | undefined;

  try {
    [
      summary,
      topDomains,
      dailySummary,
      weeklyComparison,
      monthlyComparison,
      userList,
    ] = await Promise.all([
      getSummary(user.id),
      getTopDomains(user.id),
      getDailySummary(user.id),
      getWeeklyComparison(user.id),
      getMonthlyComparison(user.id),
      getAllUsers(),
    ]);
  } catch (e) {
    console.error("Failed to fetch dashboard data:", e);
    // Data will remain undefined and the UI will show empty/default states
  }

  return (
    <div className="w-full flex flex-col gap-8">
      
      <RestrictionsManager
        initialUid={user.id}
        allUsers={userList?.users ?? []}
      />
    </div>
  );
}
