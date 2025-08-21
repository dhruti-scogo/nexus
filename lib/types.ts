export interface RestrictionData {
  id: number;
  uid: string;
  domain: string;
  time: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserListData {
  users: (string | User)[]; // Support both string UIDs and User objects
  count: number;
}

export interface RestrictionCreateRequest {
  uid: string;
  domain: string;
  time: number;
}

// New types for pod management
export interface PodListData {
  pods: string[];
  count: number;
}

export interface PodUsersData {
  users: User[];
}

export interface User {
  id: number;
  uid: string;
  username?: string; // Add optional username field since API includes it
  hostname: string;
  podName: string;
  extensionVersion: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

// New types for bulk restriction operations
export interface RestrictionBulkCreateRequest {
  userIds: string[];
  domainName: string;
  time: number;
}

export interface RestrictionPodRequest {
  podName: string;
  domainName: string;
  time: number;
}
