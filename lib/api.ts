import {
  RestrictionCreateRequest,
  RestrictionData,
  UserListData,
  PodListData,
  PodUsersData,
  User,
  RestrictionBulkCreateRequest,
  RestrictionPodRequest,
} from "./types";

const API_BASE_URL = "https://backend.prasadpatra.dev/api";

// Define error response types
interface ValidationError {
  error: string;
}

interface ApiError extends Error {
  status: number;
  info?: ValidationError;
}

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  console.log("🌐 Fetcher: Making request to:", url);
  console.log("🌐 Fetcher: Request options:", options);
  const res = await fetch(url, options);
  console.log("🌐 Fetcher: Response status:", res.status);
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as ApiError;
    error.status = res.status;

    // Try to parse error response for validation errors
    try {
      const errorData = await res.json();
      error.info = errorData;

      // For 400 errors, use the specific error message from the API
      if (res.status === 400 && errorData.error) {
        error.message = errorData.error;
      }
    } catch {
      // If we can't parse the error response, keep the generic message
    }

    throw error;
  }
  // PATCH: Handle empty response bodies gracefully
  try {
    return await res.json();
  } catch (e) {
    // If response is empty, return null (or you could return {} if preferred)
    return null as any;
  }
}

// Analytics endpoints removed - redirecting to Grafana dashboard

// User Management endpoints
export const getAllUsers = () => {
  console.log("🌐 API: Calling getAllUsers - GET /users");
  console.log("🌐 API: Full URL:", `${API_BASE_URL}/users`);
  return fetcher<UserListData>(`${API_BASE_URL}/users`);
};

// Pod Management endpoints
export const getAllPods = () => {
  console.log("🌐 API: Calling getAllPods - GET /pods");
  return fetcher<PodListData>(`${API_BASE_URL}/pods`);
};

export const getPodUsers = (podName: string) => {
  console.log(`🌐 API: Calling getPodUsers - GET /pods/${podName}/users`);
  return fetcher<PodUsersData>(`${API_BASE_URL}/pods/${podName}/users`);
};

// Restriction Management endpoints
export const getUserRestrictions = (uid: string) =>
  fetcher<RestrictionData[]>(`${API_BASE_URL}/restrictions/user/${uid}`);

export const addRestriction = (data: RestrictionCreateRequest) =>
  fetcher<RestrictionData>(`${API_BASE_URL}/restrictions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userUid: data.uid,
      domainName: data.domain,
      time: data.time,
    }),
  });

export const addBulkRestrictions = (data: RestrictionBulkCreateRequest) =>
  fetcher<{ message: string; count: number }>(`${API_BASE_URL}/restrictions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userIds: data.userIds,
      domainName: data.domainName,
      time: data.time,
    }),
  });

export const addPodRestriction = (data: RestrictionPodRequest) =>
  fetcher<{ message: string }>(`${API_BASE_URL}/restrictions/pod`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      podName: data.podName,
      domainName: data.domainName,
      time: data.time,
    }),
  });

export const deleteRestriction = (uid: string, domain: string) =>
  fetcher<{ message: string }>(`${API_BASE_URL}/restrictions`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userUid: uid,
      domainName: domain,
    }),
  });
