import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useApp } from "app/context/AppContext";

type AllowedRole = "VOLUNTEER" | "ORG" | "ADMIN";

export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  redirectTo = "/login",
}: {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: AllowedRole[];
  redirectTo?: string;
}) {
  const { auth, isAuthenticated } = useApp();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && auth && !allowedRoles.includes(auth.role)) {
    if (auth.role === "VOLUNTEER") return <Navigate to="/dashboard/volunteer" replace />;
    if (auth.role === "ORG") return <Navigate to="/dashboard/org" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
