import { useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { useApp } from "app/context/AppContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function LoginPage() {
  const { auth, isAuthenticated } = useApp();
  const location = useLocation();
  const redirectTarget = useMemo(() => {
    const state = location.state as { from?: string } | undefined;
    return state?.from ?? "/dashboard/volunteer";
  }, [location.state]);

  if (isAuthenticated && auth) {
    if (auth.role === "ORG") return <Navigate to="/dashboard/org" replace />;
    if (auth.role === "ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to={redirectTarget} replace />;
  }

  const callbackUrl = `${window.location.origin}/auth/callback`;
  const googleUrl = `${API_BASE}/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
    callbackUrl
  )}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #f5f0e8 0%, #e8ddd0 100%)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
      >
        <h1 style={{ color: "#2c1e12", fontSize: "1.8rem", fontWeight: 800 }}>Sign in</h1>
        <p className="mt-2 text-sm" style={{ color: "#7c5a3e" }}>
          Use Google to continue to your volunteer, organization, or admin dashboard.
        </p>

        <a
          href={googleUrl}
          className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-sm"
          style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700 }}
        >
          <span>G</span>
          Sign in with Google
        </a>

        <p className="mt-5 text-xs" style={{ color: "#a08878" }}>
          After Google login, you will be redirected to role-specific dashboard routes.
        </p>
        <Link to="/" className="inline-block mt-4 text-sm" style={{ color: "#4a7c59" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
