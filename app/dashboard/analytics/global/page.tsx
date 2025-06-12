import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGlobalAverageDailyUsage, getGlobalMostTimeSpent } from "@/lib/api";
import { GlobalAverageUsageData, GlobalTimeSpentData } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function GlobalAnalyticsPage() {
  let globalMostTimeSpent: GlobalTimeSpentData[] | undefined;
  let globalAverageDailyUsage: GlobalAverageUsageData | undefined;

  try {
    [globalMostTimeSpent, globalAverageDailyUsage] = await Promise.all([
      getGlobalMostTimeSpent(),
      getGlobalAverageDailyUsage(),
    ]);
  } catch (error) {
    console.error("Failed to fetch global analytics data:", error);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1 h-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-sm font-medium">
            Global Average Daily Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {globalAverageDailyUsage?.averageDailyTime ?? 0}
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Global Most Time Spent</CardTitle>
          <CardDescription>
            Top 10 domains globally by time spent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead className="text-right">Time Spent (in seconds)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(globalMostTimeSpent ?? []).map((item) => (
                <TableRow key={item.url}>
                  <TableCell className="font-medium">{item.url}</TableCell>
                  <TableCell className="text-right">{item.timeSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 