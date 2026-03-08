import { useState } from "react";
import { Link } from "react-router";
import {
  PlusCircle, Users, CheckCircle, Clock, MapPin, Trash2, Edit3,
  AlertCircle, BarChart3, ChevronRight, Award
} from "lucide-react";
import { useApp } from "../context/AppContext";
import type{ Position, Volunteer } from "../data/mockData";

type TabKey = "active" | "pending" | "completed";

export function OrgDashboard() {
  const {
    currentOrg,
    getOrgPositions,
    pendingConfirmations,
    deletePosition,
    completions,
    volunteers,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabKey>("active");
  const [confirmModal, setConfirmModal] = useState<{ position: Position; volunteer: Volunteer } | null>(null);
  const [confirmHours, setConfirmHours] = useState("4");
  const [confirmNote, setConfirmNote] = useState("");
  const { confirmCompletion } = useApp();

  const orgPositions = getOrgPositions(currentOrg.id);
  const pending = pendingConfirmations(currentOrg.id);
  const completedPositions = orgPositions.filter((p) => p.confirmedCompletions.length > 0);
  const totalVolunteers = orgPositions.reduce((acc, p) => acc + p.signedUpVolunteers.length, 0);
  const totalHours = completions
    .filter((c) => orgPositions.some((p) => p.id === c.positionId))
    .reduce((acc, c) => acc + c.hoursServed, 0);

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "active", label: "Active Positions", count: orgPositions.filter((p) => p.status !== "completed").length },
    { key: "pending", label: "Pending Confirmations", count: pending.length },
    { key: "completed", label: "Completions", count: completedPositions.length },
  ];

  const handleConfirm = () => {
    if (!confirmModal) return;
    confirmCompletion(confirmModal.position.id, confirmModal.volunteer.id, Number(confirmHours), confirmNote);
    setConfirmModal(null);
    setConfirmNote("");
    setConfirmHours("4");
  };

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #4a2f1a 0%, #7c5a3e 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{currentOrg.logo}</span>
              <div>
                <p className="text-sm mb-1" style={{ color: "#d4b896", letterSpacing: "0.05em" }}>
                  Organization Dashboard
                </p>
                <h1 style={{ color: "#f0e6d8", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.01em" }}>
                  {currentOrg.name}
                </h1>
                <p className="text-sm" style={{ color: "#c4a882" }}>
                  {currentOrg.city}, {currentOrg.state} · {currentOrg.category}
                </p>
              </div>
            </div>
            <Link
              to="/org/post"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
            >
              <PlusCircle size={16} />
              Post New Position
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <BarChart3 size={18} />, value: orgPositions.length, label: "Positions Posted" },
              { icon: <Users size={18} />, value: totalVolunteers, label: "Volunteers Signed Up" },
              { icon: <Clock size={18} />, value: `${totalHours}h`, label: "Hours Contributed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#d4b896" }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl" style={{ color: "#f0e6d8", fontWeight: 800 }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: "#c4a882" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Pending alert */}
        {pending.length > 0 && activeTab !== "pending" && (
          <button
            onClick={() => setActiveTab("pending")}
            className="w-full mb-5 p-4 rounded-2xl flex items-center gap-3 text-left transition-all hover:opacity-90"
            style={{ backgroundColor: "#fef3e2", border: "1.5px solid #f8d4a0" }}
          >
            <AlertCircle size={20} style={{ color: "#d4813a", flexShrink: 0 }} />
            <div className="flex-1">
              <p className="text-sm" style={{ color: "#a05e1a", fontWeight: 700 }}>
                {pending.length} volunteer completion{pending.length !== 1 ? "s" : ""} awaiting your confirmation
              </p>
              <p className="text-xs" style={{ color: "#c4813a" }}>
                Confirming completions lets volunteers receive their certificates
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "#d4813a" }} />
          </button>
        )}

        {/* Tabs */}
        <div
          className="flex rounded-2xl p-1 mb-6 gap-1"
          style={{ backgroundColor: "#e8ddd0" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
              style={{
                backgroundColor: activeTab === tab.key ? "#fff9f2" : "transparent",
                color: activeTab === tab.key ? "#2c1e12" : "#7c5a3e",
                fontWeight: activeTab === tab.key ? 700 : 400,
                boxShadow: activeTab === tab.key ? "0 1px 4px rgba(74,47,26,0.12)" : "none",
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: activeTab === tab.key
                      ? tab.key === "pending" ? "#d4813a" : "#4a7c59"
                      : "#d4b896",
                    color: activeTab === tab.key ? "#fff" : "#7c5a3e",
                    fontWeight: 700,
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Positions */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {orgPositions.filter((p) => p.status !== "completed").length === 0 ? (
              <EmptyState
                icon="📋"
                title="No active positions"
                description="Post your first volunteer position to get started"
                action={<Link to="/org/post" className="px-5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}>Post a Position</Link>}
              />
            ) : (
              orgPositions
                .filter((p) => p.status !== "completed")
                .map((position) => (
                  <div
                    key={position.id}
                    className="rounded-3xl p-5 flex flex-wrap items-center gap-4"
                    style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
                  >
                    <img
                      src={position.image}
                      alt=""
                      className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base line-clamp-1" style={{ color: "#2c1e12", fontWeight: 700 }}>
                          {position.title}
                        </h3>
                        <UrgencyBadge urgency={position.urgency} />
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs" style={{ color: "#7c5a3e" }}>
                        <span className="flex items-center gap-1"><MapPin size={11} />{position.city}, {position.state}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />{position.timeCommitment}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={11} />{position.signedUpVolunteers.length} signed up · {position.spotsAvailable} spots left
                        </span>
                      </div>
                      {/* Mini progress bar */}
                      <div className="mt-2 h-1.5 rounded-full w-32 overflow-hidden" style={{ backgroundColor: "#e8ddd0" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.round(((position.spotsTotal - position.spotsAvailable) / position.spotsTotal) * 100)}%`,
                            backgroundColor: "#4a7c59",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/position/${position.id}`}
                        className="px-3 py-2 rounded-xl text-xs"
                        style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
                      >
                        View
                      </Link>
                      <Link
                        to={`/org/edit/${position.id}`}
                        className="px-3 py-2 rounded-xl text-xs flex items-center gap-1"
                        style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}
                      >
                        <Edit3 size={12} />
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePosition(position.id)}
                        className="p-2 rounded-xl text-xs transition-colors hover:bg-red-50"
                        style={{ color: "#c0392b" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Pending Confirmations */}
        {activeTab === "pending" && (
          <div className="space-y-4">
            {pending.length === 0 ? (
              <EmptyState
                icon="✅"
                title="All caught up!"
                description="No volunteer completions are waiting for your confirmation"
              />
            ) : (
              pending.map(({ position, volunteer }) => (
                <div
                  key={`${position.id}-${volunteer.id}`}
                  className="rounded-3xl p-5 flex flex-wrap items-center gap-4"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #f8d4a0" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: "#7c5a3e", color: "#f0e6d8", fontWeight: 700 }}
                  >
                    {volunteer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base" style={{ color: "#2c1e12", fontWeight: 700 }}>{volunteer.name}</p>
                    <p className="text-sm" style={{ color: "#7c5a3e" }}>Signed up for: <strong>{position.title}</strong></p>
                    <p className="text-xs mt-0.5" style={{ color: "#a08878" }}>
                      {new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setConfirmModal({ position, volunteer });
                      setConfirmNote("");
                      setConfirmHours("4");
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm transition-all"
                    style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
                  >
                    <CheckCircle size={15} />
                    Confirm Completion
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Completed */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedPositions.length === 0 ? (
              <EmptyState
                icon="🏅"
                title="No completions yet"
                description="Confirmed volunteer completions will appear here"
              />
            ) : (
              completedPositions.map((position) => (
                <div
                  key={position.id}
                  className="rounded-3xl p-5"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #b8dfc4" }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <CheckCircle size={18} style={{ color: "#4a7c59" }} />
                    <h3 className="text-base" style={{ color: "#2c1e12", fontWeight: 700 }}>{position.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}>
                      {position.confirmedCompletions.length} confirmed
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {position.confirmedCompletions.map((volId) => {
                      const vol = volunteers.find((v) => v.id === volId);
                      if (!vol) return null;
                      return (
                        <div
                          key={volId}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                          style={{ backgroundColor: "#eef7f0", border: "1px solid #b8dfc4" }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: "#7c5a3e", color: "#f0e6d8", fontWeight: 700 }}
                          >
                            {vol.avatar}
                          </div>
                          <span style={{ color: "#2d5016" }}>{vol.name}</span>
                          <Award size={13} style={{ color: "#4a7c59" }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(45,80,22,0.4)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 shadow-2xl"
            style={{ backgroundColor: "#fff9f2" }}
          >
            <h2 style={{ color: "#2c1e12", fontWeight: 800, marginBottom: "4px" }}>Confirm Completion</h2>
            <p className="text-sm mb-5" style={{ color: "#7c5a3e" }}>
              You're confirming that <strong>{confirmModal.volunteer.name}</strong> completed{" "}
              <strong>{confirmModal.position.title}</strong>.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                  Hours Served
                </label>
                <input
                  type="number"
                  value={confirmHours}
                  onChange={(e) => setConfirmHours(e.target.value)}
                  min="0.5"
                  step="0.5"
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{ backgroundColor: "#f5f0e8", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                  Message for the Volunteer
                </label>
                <textarea
                  value={confirmNote}
                  onChange={(e) => setConfirmNote(e.target.value)}
                  placeholder="Share what the volunteer contributed and how they made a difference..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                  style={{ backgroundColor: "#f5f0e8", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-3 rounded-2xl text-sm"
                style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!confirmNote.trim()}
                className="flex-1 py-3 rounded-2xl text-sm transition-opacity"
                style={{
                  backgroundColor: confirmNote.trim() ? "#4a7c59" : "#b8dfc4",
                  color: "#d4e8d8",
                  fontWeight: 600,
                  opacity: confirmNote.trim() ? 1 : 0.6,
                }}
              >
                ✓ Confirm & Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    critical: { bg: "#fde8e8", text: "#c0392b" },
    high: { bg: "#fef3e2", text: "#d4813a" },
    medium: { bg: "#eef7f0", text: "#3d7a52" },
    low: { bg: "#f0ede8", text: "#7c5a3e" },
  };
  const c = colors[urgency] || colors.low;
  return (
    <span className="px-2 py-0.5 rounded-full text-xs capitalize" style={{ backgroundColor: c.bg, color: c.text, fontWeight: 600 }}>
      {urgency}
    </span>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 style={{ color: "#4a2f1a", fontWeight: 700 }}>{title}</h3>
      <p className="text-sm mt-1 mb-4" style={{ color: "#7c5a3e" }}>{description}</p>
      {action}
    </div>
  );
}
