import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router";
import { useApp } from "app/context/AppContext";

function extractTokenFromHash() {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  return params.get("token") ?? params.get("access_token");
}

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const { loginWithAuth, auth } = useApp();

  const token = searchParams.get("token") ?? searchParams.get("access_token") ?? extractTokenFromHash();
  const roleRaw = searchParams.get("role");
  const userId = searchParams.get("userId") ?? searchParams.get("id") ?? "vol-1";
  const name = searchParams.get("name") ?? undefined;
  const normalizedRole =
    String(roleRaw ?? "VOLUNTEER").toUpperCase() === "ADMIN"
      ? "ADMIN"
      : String(roleRaw ?? "VOLUNTEER").toUpperCase() === "ORG" ||
        String(roleRaw ?? "VOLUNTEER").toUpperCase() === "ORGANIZATION"
      ? "ORG"
      : "VOLUNTEER";

  useEffect(() => {
    if (!token) return;
    loginWithAuth({
      token,
      role: normalizedRole,
      userId,
      name,
    });
  }, [token, normalizedRole, userId, name, loginWithAuth]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f0e8" }}>
        <p style={{ color: "#7c5a3e" }}>Completing sign-in...</p>
      </div>
    );
  }

  if (auth.role === "ORG") return <Navigate to="/dashboard/org" replace />;
  if (auth.role === "ADMIN") return <Navigate to="/admin" replace />;
  return <Navigate to="/dashboard/volunteer" replace />;
}
