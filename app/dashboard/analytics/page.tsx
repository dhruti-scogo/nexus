import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDailySummary,
  getMonthlyComparison,
  getSummary,
  getTopDomains,
  getWeeklyComparison,
  getDomainVisits,
  getAllUsers,
} from "@/lib/api";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import {
  DailySummaryData,
  DomainData,
  MonthlyComparisonData,
  SummaryData,
  WeeklyComparisonData,
  DomainVisitData,
  UserListData,
} from "@/lib/types";
import { UserSelector } from "@/components/user-selector";

interface PageProps {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams;
  const uidParam = awaitedSearchParams?.uid;
  const uid = Array.isArray(uidParam) ? uidParam[0] : uidParam ?? "user123";

  let summary: SummaryData | undefined;
  let topDomains: DomainData[] | undefined;
  let dailySummary: DailySummaryData[] | undefined;
  let weeklyComparison: WeeklyComparisonData | undefined;
  let monthlyComparison: MonthlyComparisonData | undefined;
  let domainVisits: DomainVisitData[] | undefined;
  let userList: UserListData | undefined;

  try {
    [
      summary,
      topDomains,
      dailySummary,
      weeklyComparison,
      monthlyComparison,
      domainVisits,
      userList,
    ] = await Promise.all([
      getSummary(uid),
      getTopDomains(uid),
      getDailySummary(uid),
      getWeeklyComparison(uid),
      getMonthlyComparison(uid),
      getDomainVisits(uid),
      getAllUsers(),
    ]);
  } catch (e) {
    console.error("Failed to fetch dashboard data:", e);
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <UserSelector users={userList?.users ?? []} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.totalTime ?? 0} seconds
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.totalVisits ?? 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Time Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklyComparison?.percentChange.time ?? 0}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Time Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyComparison?.percentChange.time ?? 0}%
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Domains by Time</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales data={topDomains ?? []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Domains by Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales data={domainVisits ?? []} keyName="counter" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={dailySummary ?? []} />
        </CardContent>
      </Card>
    </div>
  );
} 