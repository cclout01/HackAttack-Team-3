import { Link } from "react-router";
import { MapPin, Clock, Calendar, Users, Flame, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import type { Position, Organization } from "../data/mockData";

const urgencyConfig = {
  critical: {
    label: "Urgent",
    bg: "#fde8e8",
    text: "#c0392b",
    icon: <Flame size={12} strokeWidth={2.5} />,
    border: "#f5b7b1",
  },
  high: {
    label: "High Need",
    bg: "#fef3e2",
    text: "#d4813a",
    icon: <AlertTriangle size={12} strokeWidth={2.5} />,
    border: "#f8d4a0",
  },
  medium: {
    label: "Needed",
    bg: "#eef7f0",
    text: "#3d7a52",
    icon: <Leaf size={12} strokeWidth={2.5} />,
    border: "#b8dfc4",
  },
  low: {
    label: "Open",
    bg: "#f0ede8",
    text: "#7c5a3e",
    icon: <CheckCircle size={12} strokeWidth={2.5} />,
    border: "#d4b896",
  },
};

interface PositionCardProps {
  position: Position;
  org: Organization;
}

export function PositionCard({ position, org }: PositionCardProps) {
  const urgency = urgencyConfig[position.urgency];
  const fillPercent = Math.round(
    ((position.spotsTotal - position.spotsAvailable) / position.spotsTotal) * 100
  );
  const isPast = new Date(position.date) < new Date();

  return (
    <Link to={`/position/${position.id}`} className="group block">
      <div
        className="rounded-3xl overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col"
        style={{
          backgroundColor: "#fff9f2",
          border: "1.5px solid #e8ddd0",
          boxShadow: "0 2px 12px rgba(74,47,26,0.07)",
        }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={position.image}
            alt={position.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(45,80,22,0.6) 100%)" }}
          />
          {/* Urgency badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
            style={{
              backgroundColor: urgency.bg,
              color: urgency.text,
              border: `1px solid ${urgency.border}`,
              fontWeight: 600,
            }}
          >
            {urgency.icon}
            {urgency.label}
          </div>
          {/* Category */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs"
            style={{ backgroundColor: "rgba(45,80,22,0.8)", color: "#d4e8d8", fontWeight: 500 }}
          >
            {position.category}
          </div>
          {/* Org name on image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="text-lg">{org.logo}</span>
            <span className="text-sm" style={{ color: "#d4e8d8", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
              {org.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="mb-2 line-clamp-2" style={{ color: "#2c1e12", fontWeight: 700, fontSize: "16px", lineHeight: 1.35 }}>
            {position.title}
          </h3>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: "#7c5a3e", flexShrink: 0 }} />
              <span className="text-xs line-clamp-1" style={{ color: "#7c5a3e" }}>
                {position.city}, {position.state}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: "#7c5a3e", flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#7c5a3e" }}>
                {new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                {position.endDate && ` – ${new Date(position.endDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: "#7c5a3e", flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#7c5a3e" }}>{position.timeCommitment}</span>
            </div>
          </div>

          <p className="text-xs line-clamp-2 mb-4 flex-1" style={{ color: "#6b5040", lineHeight: 1.5 }}>
            {position.description}
          </p>

          {/* Spots bar */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <Users size={12} style={{ color: "#4a7c59" }} />
                <span className="text-xs" style={{ color: "#4a7c59", fontWeight: 600 }}>
                  {position.spotsAvailable} spot{position.spotsAvailable !== 1 ? "s" : ""} left
                </span>
              </div>
              <span className="text-xs" style={{ color: "#a08878" }}>
                of {position.spotsTotal} total
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e8ddd0" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${fillPercent}%`,
                  backgroundColor: fillPercent > 85 ? "#c0392b" : fillPercent > 60 ? "#d4813a" : "#4a7c59",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
