import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft, MapPin, Clock, Calendar, Users, Flame, AlertTriangle, CheckCircle,
  Leaf, Building2, ExternalLink, Share2, BookmarkPlus, ChevronRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

const urgencyConfig = {
  critical: { label: "Urgently Needed", bg: "#fde8e8", text: "#c0392b", border: "#f5b7b1", icon: <Flame size={14} /> },
  high: { label: "High Need", bg: "#fef3e2", text: "#d4813a", border: "#f8d4a0", icon: <AlertTriangle size={14} /> },
  medium: { label: "Volunteers Needed", bg: "#eef7f0", text: "#3d7a52", border: "#b8dfc4", icon: <Leaf size={14} /> },
  low: { label: "Open Position", bg: "#f0ede8", text: "#7c5a3e", border: "#d4b896", icon: <CheckCircle size={14} /> },
};

export function PositionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPosition, getOrg, isSignedUp, signUpForPosition, withdrawFromPosition, userMode, currentVolunteer } = useApp();

  const position = getPosition(id!);
  const org = position ? getOrg(position.orgId) : undefined;

  if (!position || !org) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
        <h2 style={{ color: "#4a2f1a" }}>Position not found</h2>
        <Link to="/" className="mt-4 underline" style={{ color: "#4a7c59" }}>
          Browse all positions
        </Link>
      </div>
    );
  }

  const urgency = urgencyConfig[position.urgency];
  const signedUp = isSignedUp(position.id);
  const isPast = new Date(position.date) < new Date();
  const isCompleted = currentVolunteer?.completedPositions.includes(position.id);
  const fillPercent = Math.round(((position.spotsTotal - position.spotsAvailable) / position.spotsTotal) * 100);
  const canSignUp = userMode === "volunteer" && !isPast && position.spotsAvailable > 0;

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Back bar */}
      <div style={{ backgroundColor: "#fff9f2", borderBottom: "1px solid #e8ddd0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#7c5a3e" }}
          >
            <ArrowLeft size={16} />
            Back to positions
          </button>
          <span style={{ color: "#d4b896" }}>›</span>
          <span className="text-sm line-clamp-1" style={{ color: "#4a2f1a" }}>
            {position.title}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden h-72">
              <img
                src={position.image}
                alt={position.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(45,80,22,0.7) 100%)" }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: urgency.bg, color: urgency.text, border: `1px solid ${urgency.border}`, fontWeight: 600 }}
                  >
                    {urgency.icon}
                    {urgency.label}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "rgba(45,80,22,0.85)", color: "#d4e8d8", fontWeight: 500 }}
                  >
                    {position.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Title & org */}
            <div
              className="rounded-3xl p-6"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{org.logo}</span>
                <div>
                  <p className="text-sm" style={{ color: "#7c5a3e" }}>{org.name}</p>
                  <h1
                    style={{ color: "#2c1e12", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                  >
                    {position.title}
                  </h1>
                </div>
              </div>

              {/* Quick facts grid */}
              <div
                className="grid grid-cols-2 gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: "#f5f0e8" }}
              >
                <InfoItem icon={<MapPin size={14} />} label="Location">
                  {position.location}<br />
                  <span style={{ color: "#a08878" }}>{position.city}, {position.state}</span>
                </InfoItem>
                <InfoItem icon={<Calendar size={14} />} label="Date">
                  {new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  {position.endDate && (
                    <><br /><span style={{ color: "#a08878" }}>through {new Date(position.endDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}</span></>
                  )}
                </InfoItem>
                <InfoItem icon={<Clock size={14} />} label="Time Commitment">
                  {position.timeCommitment}
                </InfoItem>
                <InfoItem icon={<Users size={14} />} label="Spots Available">
                  <span style={{ color: position.spotsAvailable === 0 ? "#c0392b" : position.spotsAvailable < 4 ? "#d4813a" : "#4a7c59", fontWeight: 700 }}>
                    {position.spotsAvailable}
                  </span> of {position.spotsTotal} remaining
                </InfoItem>
              </div>
            </div>

            {/* Description */}
            <div
              className="rounded-3xl p-6"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <h2 style={{ color: "#2c1e12", fontWeight: 700, marginBottom: "12px" }}>About This Role</h2>
              <p style={{ color: "#4a2f1a", lineHeight: 1.75, fontSize: "15px" }}>
                {position.description}
              </p>
            </div>

            {/* Requirements */}
            {position.requirements && (
              <div
                className="rounded-3xl p-6"
                style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
              >
                <h2 style={{ color: "#2c1e12", fontWeight: 700, marginBottom: "12px" }}>Requirements</h2>
                <p style={{ color: "#4a2f1a", lineHeight: 1.75, fontSize: "15px" }}>
                  {position.requirements}
                </p>
              </div>
            )}

            {/* Skills */}
            <div
              className="rounded-3xl p-6"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <h2 style={{ color: "#2c1e12", fontWeight: 700, marginBottom: "12px" }}>Skills & Qualities</h2>
              <div className="flex flex-wrap gap-2">
                {position.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm"
                    style={{ backgroundColor: "#d4e8d8", color: "#2d5016", fontWeight: 500 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Sign up card */}
            <div
              className="rounded-3xl p-6 sticky top-24"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              {/* Spots progress */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                    {position.spotsAvailable} spots left
                  </span>
                  <span className="text-sm" style={{ color: "#a08878" }}>
                    {fillPercent}% filled
                  </span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e8ddd0" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${fillPercent}%`,
                      backgroundColor: fillPercent > 85 ? "#c0392b" : fillPercent > 60 ? "#d4813a" : "#4a7c59",
                    }}
                  />
                </div>
              </div>

              {isCompleted ? (
                <div
                  className="w-full py-3 rounded-2xl flex flex-col items-center gap-1 mb-3"
                  style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}
                >
                  <CheckCircle size={20} />
                  <span className="text-sm" style={{ fontWeight: 600 }}>Role Completed!</span>
                </div>
              ) : userMode === "volunteer" ? (
                <button
                  onClick={() => (signedUp ? withdrawFromPosition(position.id) : signUpForPosition(position.id))}
                  disabled={!canSignUp && !signedUp}
                  className="w-full py-3.5 rounded-2xl text-sm transition-all mb-3"
                  style={{
                    backgroundColor: signedUp
                      ? "#f0ede8"
                      : position.spotsAvailable === 0 || isPast
                      ? "#e8ddd0"
                      : "#4a7c59",
                    color: signedUp ? "#7c5a3e" : position.spotsAvailable === 0 || isPast ? "#a08878" : "#d4e8d8",
                    fontWeight: 600,
                    cursor: position.spotsAvailable === 0 && !signedUp ? "not-allowed" : "pointer",
                    border: signedUp ? "1.5px solid #d4b896" : "none",
                  }}
                >
                  {isPast
                    ? "This position has passed"
                    : position.spotsAvailable === 0 && !signedUp
                    ? "Position Filled"
                    : signedUp
                    ? "✓ You're signed up — Withdraw"
                    : "Sign Up to Volunteer"}
                </button>
              ) : (
                <div
                  className="w-full py-3 rounded-2xl text-center text-sm mb-3"
                  style={{ backgroundColor: "#f0ede8", color: "#a08878" }}
                >
                  Switch to Volunteer mode to sign up
                </div>
              )}

              {signedUp && !isCompleted && (
                <div
                  className="p-3 rounded-2xl text-sm text-center"
                  style={{ backgroundColor: "#eef7f0", color: "#3d7a52" }}
                >
                  🎉 You're registered! We'll see you there.
                </div>
              )}

              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #e8ddd0" }}>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm"
                    style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
                  >
                    <BookmarkPlus size={14} />
                    Save
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm"
                    style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Organization card */}
            <div
              className="rounded-3xl p-5"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{org.logo}</span>
                <div>
                  <p className="text-sm" style={{ color: "#2c1e12", fontWeight: 700 }}>{org.name}</p>
                  <p className="text-xs" style={{ color: "#a08878" }}>{org.city}, {org.state}</p>
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: "#6b5040", lineHeight: 1.6 }}>
                {org.description}
              </p>
              <a
                href={`https://${org.website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "#4a7c59", fontWeight: 500 }}
              >
                <ExternalLink size={13} />
                {org.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ color: "#7c5a3e" }}>{icon}</span>
        <span className="text-xs uppercase tracking-wider" style={{ color: "#a08878", fontWeight: 600, letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <p className="text-sm" style={{ color: "#2c1e12", lineHeight: 1.5 }}>
        {children}
      </p>
    </div>
  );
}
