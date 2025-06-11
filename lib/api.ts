import {
  DailySummaryData,
  DomainData,
  DomainVisitData,
  GlobalAverageUsageData,
  GlobalTimeSpentData,
  MonthlyComparisonData,
  RestrictionCreateRequest,
  RestrictionData,
  SummaryData,
  UserListData,
  WeeklyComparisonData,
} from "./types";

const API_BASE_URL = "https://backend.prasadpatra.dev/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    // error.info = await res.json();
    // error.status = res.status;
    throw error;
  }
  return res.json();
}

export const getTopDomains = (uid: string) =>
  fetcher<DomainData[]>(`${API_BASE_URL}/analytics/top-domains/${uid}`);
export const getDailySummary = (uid: string) =>
  fetcher<DailySummaryData[]>(`${API_BASE_URL}/analytics/daily-summary/${uid}`);
export const getDomainVisits = (uid: string) =>
  fetcher<DomainVisitData[]>(`${API_BASE_URL}/analytics/domain-visits/${uid}`);
export const getSummary = (uid: string) =>
  fetcher<SummaryData>(`${API_BASE_URL}/analytics/summary/${uid}`);
export const getWeeklyComparison = (uid: string) =>
  fetcher<WeeklyComparisonData>(
    `${API_BASE_URL}/analytics/compare-week/${uid}`
  );
export const getMonthlyComparison = (uid: string) =>
  fetcher<MonthlyComparisonData>(
    `${API_BASE_URL}/analytics/compare-month/${uid}`
  );
export const getGlobalMostTimeSpent = () =>
  fetcher<GlobalTimeSpentData[]>(
    `${API_BASE_URL}/analytics/global/most-time-spent`
  );
export const getGlobalAverageDailyUsage = () =>
  fetcher<GlobalAverageUsageData>(
    `${API_BASE_URL}/analytics/global/average-daily-usage`
  );
export const getUserRestrictions = (uid: string) =>
  fetcher<RestrictionData[]>(`${API_BASE_URL}/restrictions/${uid}`);

export const addRestriction = (data: RestrictionCreateRequest) =>
  fetcher<RestrictionData>(`${API_BASE_URL}/restrictions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteRestriction = (uid: string, domain: string) =>
  fetcher<{ message: string }>(
    `${API_BASE_URL}/restrictions?uid=${uid}&domain=${domain}`,
    {
      method: "DELETE",
    }
  );

export const getAllUsers = () =>
  fetcher<UserListData>(`${API_BASE_URL}/users`); 