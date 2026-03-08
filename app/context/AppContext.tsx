import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import {
  MOCK_ORGS,
  MOCK_POSITIONS,
  MOCK_VOLUNTEERS,
  MOCK_COMPLETIONS,
} from "../data/mockData";

import type {
  Position,
  Organization,
  Volunteer,
  CompletionRecord,
} from "../data/mockData";

type UserMode = "volunteer" | "organization";

interface AppContextType {
  positions: Position[];
  organizations: Organization[];
  volunteers: Volunteer[];
  completions: CompletionRecord[];
  userMode: UserMode;
  currentVolunteer: Volunteer;
  currentOrg: Organization;
  setUserMode: (mode: UserMode) => void;
  setCurrentOrgId: (id: string) => void;
  signUpForPosition: (positionId: string) => void;
  withdrawFromPosition: (positionId: string) => void;
  isSignedUp: (positionId: string) => boolean;
  postPosition: (position: Omit<Position, "id" | "signedUpVolunteers" | "confirmedCompletions" | "status">) => void;
  updatePosition: (positionId: string, updates: Partial<Position>) => void;
  deletePosition: (positionId: string) => void;
  confirmCompletion: (positionId: string, volunteerId: string, hours: number, note: string) => void;
  getOrg: (orgId: string) => Organization | undefined;
  getPosition: (positionId: string) => Position | undefined;
  getVolunteer: (volunteerId: string) => Volunteer | undefined;
  getCompletion: (completionId: string) => CompletionRecord | undefined;
  getVolunteerCompletions: (volunteerId: string) => CompletionRecord[];
  getOrgPositions: (orgId: string) => Position[];
  pendingConfirmations: (orgId: string) => { position: Position; volunteer: Volunteer }[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS);
  const [organizations] = useState<Organization[]>(MOCK_ORGS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(MOCK_VOLUNTEERS);
  const [completions, setCompletions] = useState<CompletionRecord[]>(MOCK_COMPLETIONS);
  const [userMode, setUserMode] = useState<UserMode>("volunteer");
  const [currentVolunteerId] = useState("vol-1");
  const [currentOrgId, setCurrentOrgId] = useState("org-1");

  const currentVolunteer = volunteers.find((v) => v.id === currentVolunteerId)!;
  const currentOrg = organizations.find((o) => o.id === currentOrgId)!;

  const signUpForPosition = (positionId: string) => {
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
  };

  const isSignedUp = (positionId: string) => {
    return currentVolunteer?.signedUpPositions.includes(positionId) ?? false;
  };

  const postPosition = (position: Omit<Position, "id" | "signedUpVolunteers" | "confirmedCompletions" | "status">) => {
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

  const confirmCompletion = (positionId: string, volunteerId: string, hours: number, note: string) => {
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
    setPositions((prev) =>
      prev.map((p) => {
        if (p.id === positionId) {
          return { ...p, confirmedCompletions: [...p.confirmedCompletions, volunteerId] };
        }
        return p;
      })
    );
    setVolunteers((prev) =>
      prev.map((v) => {
        if (v.id === volunteerId && !v.completedPositions.includes(positionId)) {
          return { ...v, completedPositions: [...v.completedPositions, positionId] };
        }
        return v;
      })
    );
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

  return (
    <AppContext.Provider
      value={{
        positions,
        organizations,
        volunteers,
        completions,
        userMode,
        currentVolunteer,
        currentOrg,
        setUserMode,
        setCurrentOrgId,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
