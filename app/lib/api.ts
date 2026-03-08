const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export type ApiRole = "VOLUNTEER" | "ORGANIZATION" | "ADMIN";

export interface BackendSavedPosition {
  id?: string;
  userId: string;
  positionId: string;
  savedAt?: string;
}

export interface BackendApplication {
  id?: string;
  userId: string;
  positionId: string;
  appliedAt?: string;
  status?: "PENDING" | "ACCEPTED" | "COMPLETED";
}

export interface BackendPosition {
  id?: string;
  organizationId?: string;
  title?: string;
  description?: string;
  country?: string;
  stateOrProvince?: string;
  startMonth?: string;
  applicants?: string[];
  status?: string;
  createdAt?: string;
  urgency?: string;
  difficulty?: string;
  skills?: string[];
  duration?: string;
  volunteerCount?: number;
  expiryDate?: string;
  donationUrl?: string;
}

type RequestOptions = {
  method?: string;
  token?: string;
  role?: ApiRole;
  body?: unknown;
};

function toBackendPositionPayload(payload: Record<string, unknown>): Record<string, unknown> {
  const dateValue = typeof payload.date === "string" ? payload.date : "";
  const monthValue = typeof payload.month === "string" ? payload.month : "";
  const parsedDate = dateValue ? new Date(dateValue) : new Date();
  const yearMonth = !Number.isNaN(parsedDate.getTime())
    ? `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}`
    : `${new Date().getFullYear()}-01`;

  return {
    organizationId: payload.orgId,
    title: payload.title,
    description: payload.description,
    country: payload.city ?? payload.location,
    stateOrProvince: payload.state,
    startMonth: dateValue ? yearMonth : monthValue,
    applicants: [],
    status: "OPEN",
    createdAt: new Date().toISOString(),
    urgency: payload.urgency,
    difficulty: "medium",
    skills: payload.skills,
    duration: payload.timeCommitment,
    volunteerCount: payload.spotsTotal,
    expiryDate: payload.endDate ?? payload.date,
    donationUrl: "",
  };
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  if (options.role) {
    headers.Role = options.role;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function createPosition(payload: Record<string, unknown>, token?: string) {
  return apiRequest<BackendPosition>("/positions", {
    method: "POST",
    role: "ORGANIZATION",
    token,
    body: toBackendPositionPayload(payload),
  });
}

export async function getPositionById(positionId: string, token?: string) {
  return apiRequest<BackendPosition>(`/positions/${positionId}`, { token });
}

export async function getApplicants(positionId: string, token?: string) {
  return apiRequest<string[]>(`/positions/${positionId}/applicants`, {
    role: "ORGANIZATION",
    token,
  });
}

export async function confirmPosition(positionId: string, token?: string) {
  return apiRequest<void>(`/positions/${positionId}/confirm`, {
    method: "POST",
    role: "ORGANIZATION",
    token,
  });
}

export async function applyToPosition(positionId: string, token?: string) {
  return apiRequest<void>(`/positions/${positionId}/apply`, {
    method: "POST",
    role: "VOLUNTEER",
    token,
  });
}

export async function savePosition(userId: string, positionId: string, token?: string) {
  return apiRequest<BackendSavedPosition>(`/users/${userId}/save/${positionId}`, {
    method: "POST",
    token,
  });
}

export async function getSavedPositions(userId: string, token?: string) {
  return apiRequest<BackendSavedPosition[]>(`/users/${userId}/saved`, { token });
}

export async function getAppliedPositions(userId: string, token?: string) {
  return apiRequest<BackendApplication[]>(`/users/${userId}/applied`, { token });
}

export async function createApplication(
  data: {
    userId: string;
    positionId: string;
  },
  token?: string
) {
  return apiRequest<BackendApplication>("/applications", {
    method: "POST",
    token,
    body: data,
  });
}

export async function resetPassword(userId: string, token?: string) {
  return apiRequest<void>(`/admin/users/${userId}/reset-password`, {
    method: "POST",
    role: "ADMIN",
    token,
  });
}