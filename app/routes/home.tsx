import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Leaf, MapPin, Clock, Flame, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "app/context/AppContext";
import { PositionCard } from "app/components/PositionCard";
import type { Position } from "app/data/mockData";

const CATEGORIES = ["All", "Environment", "Food Security", "Animal Welfare", "Education", "Community", "Healthcare", "Arts & Culture"];
const LOCATIONS = ["All", "Portland, OR", "Austin, TX", "Seattle, WA", "Chicago, IL", "Denver, CO"];
const URGENCIES = ["All", "critical", "high", "medium", "low"];
const MONTHS = ["All", "March", "April", "May", "June", "July", "August"];
const TIME_COMMITMENTS = ["All", "1-2 hours", "Half day", "Full day", "Weekly", "Ongoing"];

const urgencyLabels: Record<string, string> = {
  critical: "🔴 Critical",
  high: "🟠 High Need",
  medium: "🟡 Needed",
  low: "🟢 Open",
};

export default function Home() {
  const { positions, getOrg } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [month, setMonth] = useState("All");
  const [timeCommitment, setTimeCommitment] = useState("All");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "urgency" | "spots">("date");

  const filteredPositions = useMemo(() => {
    let result = positions.filter((p) => p.status !== "completed");

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          getOrg(p.orgId)?.name.toLowerCase().includes(q)
      );
    }
    if (category !== "All") result = result.filter((p) => p.category === category);
    if (location !== "All") {
      const [city] = location.split(",");
      result = result.filter((p) => p.city === city.trim());
    }
    if (urgency !== "All") result = result.filter((p) => p.urgency === urgency);
    if (month !== "All") result = result.filter((p) => p.month === month);
    if (timeCommitment !== "All") result = result.filter((p) => p.timeCommitment === timeCommitment);

    const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (sortBy === "urgency") {
      result = [...result].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
    } else if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "spots") {
      result = [...result].sort((a, b) => a.spotsAvailable - b.spotsAvailable);
    }

    return result;
  }, [positions, search, category, location, urgency, month, timeCommitment, sortBy]);

  const activeFilterCount = [category, location, urgency, month, timeCommitment].filter((f) => f !== "All").length;

  const clearFilters = () => {
    setCategory("All");
    setLocation("All");
    setUrgency("All");
    setMonth("All");
    setTimeCommitment("All");
    setSearch("");
  };

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #3d6b4f 100%)",
        }}
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #a8c5a0 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4e8d8 0%, transparent 40%)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf size={18} style={{ color: "#a8c5a0" }} />
            <span className="text-sm tracking-widest uppercase" style={{ color: "#a8c5a0", letterSpacing: "0.12em" }}>
              Volunteer Opportunities
            </span>
          </div>
          <h1
            className="mb-4"
            style={{ color: "#d4e8d8", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Find Your Purpose,
            <br />
            <span style={{ color: "#8fbc8f" }}>Give Your Time.</span>
          </h1>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#a8c5a0", fontSize: "17px", lineHeight: 1.6 }}>
            Connect with local organizations making a difference. Every hour counts.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "#7c5a3e" }} />
            <input
              type="text"
              placeholder="Search by role, organization, city, or cause..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fffdf8",
                color: "#2c1e12",
                border: "2px solid transparent",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #4a7c59")}
              onBlur={(e) => (e.target.style.border = "2px solid transparent")}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={16} style={{ color: "#a08878" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter toggle + sort bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{ backgroundColor: "#7c5a3e", color: "#f0e6d8" }}
                >
                  {activeFilterCount}
                </span>
              )}
              {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm"
                style={{ color: "#7c5a3e", border: "1px solid #d4b896" }}
              >
                <X size={13} />
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "#7c5a3e" }}>
              {filteredPositions.length} position{filteredPositions.length !== 1 ? "s" : ""} found
            </span>
            <span style={{ color: "#d4b896" }}>·</span>
            <span className="text-sm" style={{ color: "#a08878" }}>Sort by:</span>
            {["date", "urgency", "spots"].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s as "date" | "urgency" | "spots")}
                className="px-3 py-1.5 rounded-lg text-xs transition-all capitalize"
                style={{
                  backgroundColor: sortBy === s ? "#4a7c59" : "#e8ddd0",
                  color: sortBy === s ? "#d4e8d8" : "#7c5a3e",
                  fontWeight: sortBy === s ? 600 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {showFilters && (
            <div
              className="w-64 flex-shrink-0 rounded-3xl p-5 h-fit sticky top-24 space-y-5"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", boxShadow: "0 2px 12px rgba(74,47,26,0.06)" }}
            >
              <h3 style={{ color: "#2c1e12", fontWeight: 700, fontSize: "15px" }}>Filter Positions</h3>

              {/* Category */}
              <FilterSection label="Category" icon={<Leaf size={14} />}>
                {CATEGORIES.map((c) => (
                  <FilterChip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
                ))}
              </FilterSection>

              {/* Location */}
              <FilterSection label="Location" icon={<MapPin size={14} />}>
                {LOCATIONS.map((l) => (
                  <FilterChip key={l} label={l} active={location === l} onClick={() => setLocation(l)} />
                ))}
              </FilterSection>

              {/* Urgency */}
              <FilterSection label="Urgency" icon={<Flame size={14} />}>
                {URGENCIES.map((u) => (
                  <FilterChip
                    key={u}
                    label={u === "All" ? "All" : urgencyLabels[u]}
                    active={urgency === u}
                    onClick={() => setUrgency(u)}
                  />
                ))}
              </FilterSection>

              {/* Month */}
              <FilterSection label="Month" icon={<span style={{ fontSize: "14px" }}>📅</span>}>
                <div className="grid grid-cols-2 gap-1.5">
                  {MONTHS.map((m) => (
                    <FilterChip key={m} label={m} active={month === m} onClick={() => setMonth(m)} />
                  ))}
                </div>
              </FilterSection>

              {/* Time Commitment */}
              <FilterSection label="Time Commitment" icon={<Clock size={14} />}>
                {TIME_COMMITMENTS.map((t) => (
                  <FilterChip key={t} label={t} active={timeCommitment === t} onClick={() => setTimeCommitment(t)} />
                ))}
              </FilterSection>
            </div>
          )}

          {/* Main Grid */}
          <div className="flex-1">
            {filteredPositions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#e8ddd0" }}
                >
                  <Search size={32} style={{ color: "#a08878" }} />
                </div>
                <h3 style={{ color: "#4a2f1a", fontWeight: 700 }}>No positions found</h3>
                <p className="text-sm mt-1" style={{ color: "#7c5a3e" }}>
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-5 py-2 rounded-xl text-sm"
                  style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {filteredPositions.map((position) => {
                  const org = getOrg(position.orgId);
                  if (!org) return null;
                  return <PositionCard key={position.id} position={position} org={org} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span style={{ color: "#7c5a3e" }}>{icon}</span>
        <span className="text-xs uppercase tracking-wider" style={{ color: "#7c5a3e", fontWeight: 600, letterSpacing: "0.08em" }}>
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs transition-all"
      style={{
        backgroundColor: active ? "#4a7c59" : "#f0ede8",
        color: active ? "#d4e8d8" : "#6b5040",
        fontWeight: active ? 600 : 400,
        border: active ? "1.5px solid #3d6b4f" : "1.5px solid transparent",
      }}
    >
      {label}
    </button>
  );
}
