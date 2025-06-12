import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DomainBarChart } from "@/components/domain-bar-chart";
import { ComparisonAreaChart } from "@/components/comparison-area-chart";
import { SparkAreaChart } from "@/components/spark-chart";
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
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-4">
            <div className="text-2xl font-bold">{summary?.totalTime ?? 0}s</div>
            <div className="w-full h-12">
              <SparkAreaChart data={dailySummary ?? []} dataKey="summary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
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
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-4">
            <div className="text-2xl font-bold">
              {weeklyComparison?.percentChange.time ?? 0}%
            </div>
            <div className="w-full h-12">
              {weeklyComparison && (
                <ComparisonAreaChart
                  data={{
                    current: weeklyComparison.thisWeek.time,
                    previous: weeklyComparison.lastWeek.time,
                    labels: { current: "This Week", previous: "Last Week" },
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Time Change
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-4">
            <div className="text-2xl font-bold">
              {monthlyComparison?.percentChange.time ?? 0}%
            </div>
            <div className="w-full h-12">
              {monthlyComparison && (
                <ComparisonAreaChart
                  data={{
                    current: monthlyComparison.thisMonth.time,
                    previous: monthlyComparison.lastMonth.time,
                    labels: { current: "This Month", previous: "Last Month" },
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Visits Change
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-4">
            <div className="text-2xl font-bold">
              {weeklyComparison?.percentChange.visits ?? 0}%
            </div>
            <div className="w-full h-12">
              {weeklyComparison && (
                <ComparisonAreaChart
                  data={{
                    current: weeklyComparison.thisWeek.visits,
                    previous: weeklyComparison.lastWeek.visits,
                    labels: { current: "This Week", previous: "Last Week" },
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Visits Change
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-4">
            <div className="text-2xl font-bold">
              {monthlyComparison?.percentChange.visits ?? 0}%
            </div>
            <div className="w-full h-12">
              {monthlyComparison && (
                <ComparisonAreaChart
                  data={{
                    current: monthlyComparison.thisMonth.visits,
                    previous: monthlyComparison.lastMonth.visits,
                    labels: { current: "This Month", previous: "Last Month" },
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily-summary">
            <TabsList>
              <TabsTrigger value="top-domains-time">
                Top Domains (Time)
              </TabsTrigger>
              <TabsTrigger value="top-domains-visits">
                Top Domains (Visits)
              </TabsTrigger>

              <TabsTrigger value="daily-summary">Daily Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="daily-summary">
              <Overview data={dailySummary ?? []} />
            </TabsContent>
            <TabsContent value="top-domains-time">
              <DomainBarChart
                data={topDomains ?? []}
                dataKey="summaryTime"
                name="Domain"
              />
            </TabsContent>
            <TabsContent value="top-domains-visits">
              <DomainBarChart
                data={domainVisits ?? []}
                dataKey="counter"
                name="Domain"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
