import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { useApp } from "app/context/AppContext";
import type { AppliedPosition } from "app/context/AppContext";
import type { Position } from "app/data/mockData";

function statusColor(status: AppliedPosition["status"]) {
  if (status === "COMPLETED") return { bg: "#d4e8d8", text: "#2d5016" };
  if (status === "ACCEPTED") return { bg: "#eef7f0", text: "#3d7a52" };
  return { bg: "#fef3e2", text: "#d4813a" };
}

function buildResumeText(input: {
  orgName: string;
  roleTitle: string;
  date: string;
  duties: string;
}) {
  return `${input.roleTitle} | ${input.orgName}
Date: ${input.date}
Duties: ${input.duties}`;
}

function VolunteerDashboardBody() {
  const {
    auth,
    currentVolunteer,
    getSavedPositions,
    getAppliedPositions,
    getCompletion,
    getPosition,
    getOrg,
    getLatestCompletionIdForVolunteer,
    clearLatestCompletionForVolunteer,
  } = useApp();
  const [saved, setSaved] = useState<Position[]>([]);
  const [applications, setApplications] = useState<AppliedPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const userId = auth?.userId ?? currentVolunteer.id;
  const latestCompletionId = getLatestCompletionIdForVolunteer(currentVolunteer.id);
  const latestCompletion = latestCompletionId ? getCompletion(latestCompletionId) : undefined;
  const latestPosition = latestCompletion ? getPosition(latestCompletion.positionId) : undefined;
  const latestOrg = latestPosition ? getOrg(latestPosition.orgId) : undefined;

  const resumeText = useMemo(() => {
    if (!latestCompletion || !latestPosition || !latestOrg) return "";
    return buildResumeText({
      orgName: latestOrg.name,
      roleTitle: latestPosition.title,
      date: latestCompletion.completedAt,
      duties: latestCompletion.orgNote,
    });
  }, [latestCompletion, latestPosition, latestOrg]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const [savedPositions, appliedPositions] = await Promise.all([
        getSavedPositions(userId),
        getAppliedPositions(userId),
      ]);
      if (!mounted) return;
      setSaved(savedPositions);
      setApplications(appliedPositions);
      setLoading(false);
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [getSavedPositions, getAppliedPositions, userId]);

  async function copyResumeText() {
    if (!resumeText) return;
    await navigator.clipboard.writeText(resumeText);
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 1500);
  }

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 style={{ color: "#2c1e12", fontSize: "1.9rem", fontWeight: 800 }}>Volunteer Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: "#7c5a3e" }}>
          Manage your saved positions and application progress.
        </p>

        {loading ? (
          <p className="mt-6 text-sm" style={{ color: "#a08878" }}>
            Loading dashboard...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <section
              className="rounded-3xl p-5"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <h2 style={{ color: "#2c1e12", fontWeight: 700 }}>Saved Positions</h2>
              <div className="mt-3 space-y-3">
                {saved.length === 0 && (
                  <p className="text-sm" style={{ color: "#a08878" }}>
                    No saved positions yet.
                  </p>
                )}
                {saved.map((position) => (
                  <Link
                    key={position.id}
                    to={`/position/${position.id}`}
                    className="block p-3 rounded-2xl text-sm"
                    style={{ backgroundColor: "#f5f0e8", color: "#4a2f1a" }}
                  >
                    <p style={{ fontWeight: 700 }}>{position.title}</p>
                    <p style={{ color: "#7c5a3e" }}>
                      {position.city}, {position.state}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section
              className="rounded-3xl p-5"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <h2 style={{ color: "#2c1e12", fontWeight: 700 }}>My Applications</h2>
              <div className="mt-3 space-y-3">
                {applications.length === 0 && (
                  <p className="text-sm" style={{ color: "#a08878" }}>
                    No applications yet.
                  </p>
                )}
                {applications.map((application) => {
                  const colors = statusColor(application.status);
                  return (
                    <div
                      key={application.positionId}
                      className="p-3 rounded-2xl text-sm flex items-center justify-between gap-3"
                      style={{ backgroundColor: "#f5f0e8", color: "#4a2f1a" }}
                    >
                      <p style={{ fontWeight: 700 }}>{application.title}</p>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: colors.bg, color: colors.text, fontWeight: 700 }}
                      >
                        {application.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>

      {latestCompletion && latestPosition && latestOrg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(45,80,22,0.42)" }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-6"
            style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
          >
            <h2 style={{ color: "#2c1e12", fontWeight: 800 }}>Completion confirmed</h2>
            <p className="text-sm mt-1" style={{ color: "#7c5a3e" }}>
              {latestOrg.name} confirmed your role. Add this to your resume:
            </p>
            <pre
              className="mt-4 p-4 rounded-2xl whitespace-pre-wrap text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12", border: "1px solid #e8ddd0" }}
            >
              {resumeText}
            </pre>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => void copyResumeText()}
                className="px-4 py-2.5 rounded-2xl text-sm"
                style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700 }}
              >
                {copyState === "copied" ? "Copied" : "Copy to clipboard"}
              </button>
              <Link
                to={`/completion/${latestCompletion.id}`}
                className="px-4 py-2.5 rounded-2xl text-sm"
                style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
              >
                Open full confirmation page
              </Link>
              <button
                onClick={() => clearLatestCompletionForVolunteer(currentVolunteer.id)}
                className="px-4 py-2.5 rounded-2xl text-sm"
                style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VolunteerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
      <VolunteerDashboardBody />
    </ProtectedRoute>
  );
}
