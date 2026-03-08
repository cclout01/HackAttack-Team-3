import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useApp } from "app/context/AppContext";

type AllowedRole = "VOLUNTEER" | "ORG" | "ADMIN";

export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  redirectTo = "/admin-login",
}: {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: AllowedRole[];
  redirectTo?: string;
}) {
  const { auth, isAuthenticated } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    if (allowedRoles && auth && !allowedRoles.includes(auth.role)) {
      if (auth.role === "VOLUNTEER") {
        navigate("/home", { replace: true });
        return;
      }

      if (auth.role === "ORG") {
        navigate("/org/dashboard", { replace: true });
        return;
      }

      navigate("/", { replace: true });
    }
  }, [
    mounted,
    requireAuth,
    isAuthenticated,
    allowedRoles,
    auth,
    redirectTo,
    location.pathname,
    navigate,
  ]);

  if (!mounted) return null;

  if (requireAuth && !isAuthenticated) return null;

  if (allowedRoles && auth && !allowedRoles.includes(auth.role)) return null;

  return <>{children}</>;
}