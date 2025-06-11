export interface DomainData {
  url: string;
  summaryTime: number;
}

export interface DailySummaryData {
  date: string;
  summary: number;
}

export interface DomainVisitData {
  url:string;
  counter: number;
}

export interface SummaryData {
  totalTime: number;
  totalVisits: number;
}

export interface WeekData {
  time: number;
  visits: number;
}

export interface PercentageChangeData {
  time: string;
  visits: string;
}
export interface WeeklyComparisonData {
  thisWeek: WeekData;
  lastWeek: WeekData;
  percentChange: PercentageChangeData;
}

export interface MonthlyComparisonData {
  thisMonth: WeekData;
  lastMonth: WeekData;
  percentChange: PercentageChangeData;
}

export interface GlobalTimeSpentData {
  url: string;
  timeSpent: number;
}

export interface GlobalAverageUsageData {
  averageDailyTime: number;
}

export interface RestrictionData {
  id: number;
  uid: string;
  domain: string;
  time: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserListData {
  users: string[];
  count: number;
}

export interface RestrictionCreateRequest {
  uid: string;
  domain: string;
  time: number;
} 