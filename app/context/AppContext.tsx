import React, { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  MOCK_COMPLETIONS,
  MOCK_ORGS,
  MOCK_POSITIONS,
  MOCK_VOLUNTEERS,
} from "../data/mockData";
import type {
  CompletionRecord,
  Organization,
  Position,
  Volunteer,
} from "../data/mockData";
import {
  applyToPosition,
  confirmPosition,
  createApplication,
  createPosition,
  getApplicants,
  getAppliedPositions as getAppliedPositionsApi,
  getPositionById,
  getSavedPositions as getSavedPositionsApi,
  resetPassword,
  type BackendPosition,
} from "../lib/api";

type UserMode = "volunteer" | "organization";
export type AuthRole = "VOLUNTEER" | "ORG" | "ADMIN";
export type ApplicationStatus = "PENDING" | "ACCEPTED" | "COMPLETED";

export interface AuthState {
  token: string;
  role: AuthRole;
  userId: string;
  name?: string;
}

export interface AppliedPosition {
  positionId: string;
  title: string;
  status: ApplicationStatus;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

interface AppContextType {
  positions: Position[];
  organizations: Organization[];
  volunteers: Volunteer[];
  completions: CompletionRecord[];
  userMode: UserMode;
  auth: AuthState | null;
  isAuthenticated: boolean;
  currentVolunteer: Volunteer;
  currentOrg: Organization;
  setUserMode: (mode: UserMode) => void;
  setCurrentOrgId: (id: string) => void;
  loginWithAuth: (authState: AuthState) => void;
  logout: () => void;
  signUpForPosition: (positionId: string) => void;
  withdrawFromPosition: (positionId: string) => void;
  isSignedUp: (positionId: string) => boolean;
  postPosition: (
    position: Omit<
      Position,
      "id" | "signedUpVolunteers" | "confirmedCompletions" | "status"
    >
  ) => void;
  updatePosition: (positionId: string, updates: Partial<Position>) => void;
  deletePosition: (positionId: string) => void;
  confirmCompletion: (
    positionId: string,
    volunteerId: string,
    hours: number,
    note: string
  ) => Promise<CompletionRecord>;
  getOrg: (orgId: string) => Organization | undefined;
  getPosition: (positionId: string) => Position | undefined;
  getVolunteer: (volunteerId: string) => Volunteer | undefined;
  getCompletion: (completionId: string) => CompletionRecord | undefined;
  getVolunteerCompletions: (volunteerId: string) => CompletionRecord[];
  getOrgPositions: (orgId: string) => Position[];
  pendingConfirmations: (orgId: string) => { position: Position; volunteer: Volunteer }[];
  getSavedPositions: (userId: string) => Promise<Position[]>;
  getAppliedPositions: (userId: string) => Promise<AppliedPosition[]>;
  getApplicantsForPosition: (positionId: string) => Promise<Volunteer[]>;
  createPositionFromForm: (payload: Record<string, unknown>) => Promise<void>;
  getAllUsersForAdmin: () => Promise<AdminUser[]>;
  resetPasswordForUser: (userId: string) => Promise<void>;
  getLatestCompletionIdForVolunteer: (volunteerId: string) => string | undefined;
  clearLatestCompletionForVolunteer: (volunteerId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function normalizeRole(role: string | null | undefined): AuthRole {
  const raw = String(role ?? "").toUpperCase();
  if (raw === "ADMIN") return "ADMIN";
  if (raw === "ORG" || raw === "ORGANIZATION") return "ORG";
  return "VOLUNTEER";
}

function toUiPosition(post: BackendPosition): Position {
  const id = post.id ?? `pos-${Date.now()}`;
  const month = post.startMonth
    ? new Date(`${post.startMonth}-01`).toLocaleString("en-US", { month: "long" })
    : "January";

  return {
    id,
    orgId: post.organizationId ?? "org-1",
    title: post.title ?? "Untitled Position",
    description: post.description ?? "",
    requirements: "",
    skills: post.skills ?? [],
    location: post.country ?? "",
    city: post.country ?? "",
    state: post.stateOrProvince ?? "",
    date: post.expiryDate ?? new Date().toISOString().split("T")[0],
    month,
    timeCommitment: "Half day",
    urgency: (post.urgency as Position["urgency"]) ?? "medium",
    category: "Community",
    spotsTotal: post.volunteerCount ?? 0,
    spotsAvailable: post.volunteerCount ?? 0,
    image: "",
    signedUpVolunteers: post.applicants ?? [],
    confirmedCompletions: [],
    status: String(post.status ?? "OPEN").toUpperCase() === "CLOSED" ? "filled" : "open",
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS);
  const [organizations] = useState<Organization[]>(MOCK_ORGS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(MOCK_VOLUNTEERS);
  const [completions, setCompletions] = useState<CompletionRecord[]>(MOCK_COMPLETIONS);
  const [userMode, setUserMode] = useState<UserMode>("volunteer");
  const [currentVolunteerId] = useState("vol-1");
  const [currentOrgId, setCurrentOrgId] = useState("org-1");
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [savedByVolunteer, setSavedByVolunteer] = useState<Record<string, string[]>>({
    "vol-1": ["pos-3", "pos-5"],
    "vol-2": ["pos-1"],
  });
  const [appliedByVolunteer, setAppliedByVolunteer] = useState<
    Record<string, Array<{ positionId: string; status: ApplicationStatus }>>
  >({
    "vol-1": [
      { positionId: "pos-1", status: "PENDING" },
      { positionId: "pos-2", status: "ACCEPTED" },
      { positionId: "pos-9", status: "COMPLETED" },
      { positionId: "pos-10", status: "COMPLETED" },
    ],
    "vol-2": [{ positionId: "pos-4", status: "PENDING" }],
  });
  const [latestCompletionByVolunteer, setLatestCompletionByVolunteer] = useState<
    Record<string, string>
  >({});

  const currentVolunteer = volunteers.find((v) => v.id === currentVolunteerId) ?? volunteers[0];
  const currentOrg = organizations.find((o) => o.id === currentOrgId) ?? organizations[0];
  const isAuthenticated = Boolean(auth?.token);

  const loginWithAuth = (authState: AuthState) => {
    const role = normalizeRole(authState.role);
    const next = { ...authState, role };
    setAuth(next);
    if (role === "ORG") setUserMode("organization");
    if (role === "VOLUNTEER") setUserMode("volunteer");
  };

  const logout = () => setAuth(null);

  const signUpForPosition = (positionId: string) => {
    void createApplication(
      {
        userId: auth?.userId ?? currentVolunteerId,
        positionId,
      },
      auth?.token
    ).catch(() => {
      // Keep local UX responsive even if backend is unavailable.
    });

    void applyToPosition(positionId, auth?.token).catch(() => {
      // Fallback: application record still tracks signup state.
    });

    setPositions((prev) =>
      prev.map((p) => {
        if (p.id === positionId && !p.signedUpVolunteers.includes(currentVolunteerId)) {
          return {
            ...p,
            signedUpVolunteers: [...p.signedUpVolunteers, currentVolunteerId],
            spotsAvailable: Math.max(0, p.spotsAvailable - 1),
          };
        }
        return p;
      })
    );

    setVolunteers((prev) =>
      prev.map((v) => {
        if (v.id === currentVolunteerId && !v.signedUpPositions.includes(positionId)) {
          return { ...v, signedUpPositions: [...v.signedUpPositions, positionId] };
        }
        return v;
      })
    );

    setAppliedByVolunteer((prev) => {
      const existing = prev[currentVolunteerId] ?? [];
      if (existing.some((item) => item.positionId === positionId)) return prev;
      return {
        ...prev,
        [currentVolunteerId]: [...existing, { positionId, status: "PENDING" }],
      };
    });
  };

  const withdrawFromPosition = (positionId: string) => {
    setPositions((prev) =>
      prev.map((p) => {
        if (p.id === positionId) {
          return {
            ...p,
            signedUpVolunteers: p.signedUpVolunteers.filter((id) => id !== currentVolunteerId),
            spotsAvailable: p.spotsAvailable + 1,
          };
        }
        return p;
      })
    );

    setVolunteers((prev) =>
      prev.map((v) => {
        if (v.id === currentVolunteerId) {
          return { ...v, signedUpPositions: v.signedUpPositions.filter((id) => id !== positionId) };
        }
        return v;
      })
    );

    setAppliedByVolunteer((prev) => ({
      ...prev,
      [currentVolunteerId]: (prev[currentVolunteerId] ?? []).filter(
        (item) => item.positionId !== positionId
      ),
    }));
  };

  const isSignedUp = (positionId: string) => {
    return currentVolunteer?.signedUpPositions.includes(positionId) ?? false;
  };

  const postPosition = (
    position: Omit<Position, "id" | "signedUpVolunteers" | "confirmedCompletions" | "status">
  ) => {
    const newPosition: Position = {
      ...position,
      id: `pos-${Date.now()}`,
      signedUpVolunteers: [],
      confirmedCompletions: [],
      status: "open",
    };
    setPositions((prev) => [newPosition, ...prev]);
  };

  const updatePosition = (positionId: string, updates: Partial<Position>) => {
    setPositions((prev) => prev.map((p) => (p.id === positionId ? { ...p, ...updates } : p)));
  };

  const deletePosition = (positionId: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== positionId));
  };

  const confirmCompletion = async (
    positionId: string,
    volunteerId: string,
    hours: number,
    note: string
  ) => {
    try {
      await confirmPosition(positionId, auth?.token);
    } catch {
      // Fallback to local state when backend is unavailable/incomplete.
    }

    const newCompletion: CompletionRecord = {
      id: `comp-${Date.now()}`,
      volunteerId,
      positionId,
      confirmedByOrg: true,
      completedAt: new Date().toISOString().split("T")[0],
      hoursServed: hours,
      orgNote: note,
      confirmedAt: new Date().toISOString().split("T")[0],
    };

    setCompletions((prev) => [...prev, newCompletion]);
    setLatestCompletionByVolunteer((prev) => ({ ...prev, [volunteerId]: newCompletion.id }));

    setPositions((prev) =>
      prev.map((p) => {
        if (p.id === positionId) {
          return { ...p, confirmedCompletions: [...p.confirmedCompletions, volunteerId] };
        }
        return p;
      })
    );

    setAppliedByVolunteer((prev) => ({
      ...prev,
      [volunteerId]: (prev[volunteerId] ?? []).map((item) =>
        item.positionId === positionId ? { ...item, status: "COMPLETED" } : item
      ),
    }));

    setVolunteers((prev) =>
      prev.map((v) => {
        if (v.id === volunteerId && !v.completedPositions.includes(positionId)) {
          return { ...v, completedPositions: [...v.completedPositions, positionId] };
        }
        return v;
      })
    );

    return newCompletion;
  };

  const getOrg = (orgId: string) => organizations.find((o) => o.id === orgId);
  const getPosition = (positionId: string) => positions.find((p) => p.id === positionId);
  const getVolunteer = (volunteerId: string) => volunteers.find((v) => v.id === volunteerId);
  const getCompletion = (completionId: string) => completions.find((c) => c.id === completionId);
  const getVolunteerCompletions = (volunteerId: string) =>
    completions.filter((c) => c.volunteerId === volunteerId && c.confirmedByOrg);
  const getOrgPositions = (orgId: string) => positions.filter((p) => p.orgId === orgId);

  const pendingConfirmations = (orgId: string) => {
    const orgPositions = positions.filter((p) => p.orgId === orgId);
    const result: { position: Position; volunteer: Volunteer }[] = [];
    for (const pos of orgPositions) {
      for (const volId of pos.signedUpVolunteers) {
        if (!pos.confirmedCompletions.includes(volId)) {
          const vol = volunteers.find((v) => v.id === volId);
          if (vol) result.push({ position: pos, volunteer: vol });
        }
      }
    }
    return result;
  };

  const getSavedPositions = async (userId: string) => {
    try {
      const saved = await getSavedPositionsApi(userId, auth?.token);
      const hydrated = await Promise.all(
        saved.map(async (item) => {
          const post = await getPositionById(item.positionId, auth?.token);
          return toUiPosition(post);
        })
      );
      return hydrated;
    } catch {
      const ids = savedByVolunteer[userId] ?? [];
      return ids.map((id) => positions.find((p) => p.id === id)).filter(Boolean) as Position[];
    }
  };

  const getAppliedPositions = async (userId: string) => {
    try {
      const apps = await getAppliedPositionsApi(userId, auth?.token);
      const hydrated = await Promise.all(
        apps.map(async (application) => {
          const post = await getPositionById(application.positionId, auth?.token);
          return {
            positionId: application.positionId,
            title: post.title ?? "Untitled Position",
            status: application.status ?? "PENDING",
          } as AppliedPosition;
        })
      );
      return hydrated;
    } catch {
      return (appliedByVolunteer[userId] ?? [])
        .map((entry) => {
          const p = positions.find((position) => position.id === entry.positionId);
          if (!p) return null;
          return {
            positionId: p.id,
            title: p.title,
            status: entry.status,
          };
        })
        .filter(Boolean) as AppliedPosition[];
    }
  };

  const getApplicantsForPosition = async (positionId: string) => {
    try {
      const applicantIds = await getApplicants(positionId, auth?.token);
      return applicantIds
        .map((id) => volunteers.find((v) => v.id === id))
        .filter(Boolean) as Volunteer[];
    } catch {
      const position = positions.find((p) => p.id === positionId);
      if (!position) return [];
      return position.signedUpVolunteers
        .map((id) => volunteers.find((v) => v.id === id))
        .filter(Boolean) as Volunteer[];
    }
  };

  const createPositionFromForm = async (payload: Record<string, unknown>) => {
    try {
      await createPosition(payload, auth?.token);
    } catch {
      // The form route already writes to local state via postPosition.
    }
  };

  const getAllUsersForAdmin = async (): Promise<AdminUser[]> => {
    const volunteerUsers: AdminUser[] = volunteers.map((volunteer) => ({
      id: volunteer.id,
      name: volunteer.name,
      email: volunteer.email,
      role: "VOLUNTEER",
    }));
    const orgUsers: AdminUser[] = organizations.map((org) => ({
      id: org.id,
      name: org.name,
      email: `${org.id}@org.example`,
      role: "ORG",
    }));
    const adminUser: AdminUser = {
      id: "admin-1",
      name: "Platform Admin",
      email: "admin@rootedgood.org",
      role: "ADMIN",
    };

    return [
      ...volunteerUsers,
      ...orgUsers,
      adminUser,
    ];
  };

  const resetPasswordForUser = async (userId: string) => {
    await resetPassword(userId, auth?.token);
  };

  const clearLatestCompletionForVolunteer = (volunteerId: string) => {
    setLatestCompletionByVolunteer((prev) => {
      const next = { ...prev };
      delete next[volunteerId];
      return next;
    });
  };

  const value = useMemo<AppContextType>(
    () => ({
      positions,
      organizations,
      volunteers,
      completions,
      userMode,
      auth,
      isAuthenticated,
      currentVolunteer,
      currentOrg,
      setUserMode,
      setCurrentOrgId,
      loginWithAuth,
      logout,
      signUpForPosition,
      withdrawFromPosition,
      isSignedUp,
      postPosition,
      updatePosition,
      deletePosition,
      confirmCompletion,
      getOrg,
      getPosition,
      getVolunteer,
      getCompletion,
      getVolunteerCompletions,
      getOrgPositions,
      pendingConfirmations,
      getSavedPositions,
      getAppliedPositions,
      getApplicantsForPosition,
      createPositionFromForm,
      getAllUsersForAdmin,
      resetPasswordForUser,
      getLatestCompletionIdForVolunteer: (volunteerId: string) => latestCompletionByVolunteer[volunteerId],
      clearLatestCompletionForVolunteer,
    }),
    [
      positions,
      organizations,
      volunteers,
      completions,
      userMode,
      auth,
      isAuthenticated,
      currentVolunteer,
      currentOrg,
      latestCompletionByVolunteer,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
