import { Link, useNavigate, useLocation } from "react-router";
import { Leaf, User, Building2, LayoutDashboard, PlusCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function Navbar() {
  const { userMode, setUserMode, currentVolunteer, currentOrg, organizations, setCurrentOrgId } = useApp();
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleModeSwitch = (mode: "volunteer" | "organization") => {
    setUserMode(mode);
    if (mode === "volunteer") navigate("/volunteer/profile");
    else navigate("/org/dashboard");
  };

  return (
    <nav
      style={{ backgroundColor: "#2d5016" }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              style={{ backgroundColor: "#4a7c59" }}
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
            >
              <Leaf size={20} color="#d4e8d8" strokeWidth={2.5} />
            </div>
            <span
              style={{ fontWeight: 700, color: "#d4e8d8", letterSpacing: "-0.01em", fontSize: "18px" }}
              className="hidden sm:block"
            >
              RootedGood
            </span>
          </Link>

          {/* Center Nav */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                color: location.pathname === "/" ? "#d4e8d8" : "#a8c5a0",
                backgroundColor: location.pathname === "/" ? "rgba(74,124,89,0.5)" : "transparent",
                fontWeight: location.pathname === "/" ? 600 : 400,
              }}
            >
              Browse Positions
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              className="flex rounded-xl p-1 gap-1"
            >
              <button
                onClick={() => handleModeSwitch("volunteer")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: userMode === "volunteer" ? "#4a7c59" : "transparent",
                  color: userMode === "volunteer" ? "#d4e8d8" : "#a8c5a0",
                  fontWeight: userMode === "volunteer" ? 600 : 400,
                }}
              >
                <User size={14} />
                <span className="hidden sm:inline">Volunteer</span>
              </button>
              <button
                onClick={() => handleModeSwitch("organization")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: userMode === "organization" ? "#4a7c59" : "transparent",
                  color: userMode === "organization" ? "#d4e8d8" : "#a8c5a0",
                  fontWeight: userMode === "organization" ? 600 : 400,
                }}
              >
                <Building2 size={14} />
                <span className="hidden sm:inline">Organization</span>
              </button>
            </div>

            {/* Context-aware actions */}
            {userMode === "volunteer" && (
              <Link
                to="/volunteer/profile"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
                style={{ color: "#a8c5a0" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                  style={{ backgroundColor: "#7c5a3e", color: "#f0e6d8", fontWeight: 700, fontSize: "11px" }}
                >
                  {currentVolunteer.avatar}
                </div>
                <span className="hidden sm:inline" style={{ color: "#a8c5a0" }}>My Profile</span>
              </Link>
            )}

            {userMode === "organization" && (
              <div className="flex items-center gap-2">
                {/* Org selector */}
                <div className="relative">
                  <button
                    onClick={() => setOrgMenuOpen(!orgMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
                    style={{ color: "#a8c5a0", backgroundColor: "rgba(0,0,0,0.2)" }}
                  >
                    <span style={{ color: "#d4e8d8" }}>{currentOrg.logo}</span>
                    <span className="hidden sm:inline" style={{ color: "#a8c5a0" }}>
                      {currentOrg.name}
                    </span>
                    <ChevronDown size={14} style={{ color: "#a8c5a0" }} />
                  </button>
                  {orgMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-2xl shadow-xl overflow-hidden z-50"
                      style={{ backgroundColor: "#f5f0e8", border: "1px solid #d4b896" }}
                    >
                      {organizations.map((org) => (
                        <button
                          key={org.id}
                          onClick={() => { setCurrentOrgId(org.id); setOrgMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left transition-colors hover:bg-[#e8ddd0]"
                          style={{ color: "#4a2f1a" }}
                        >
                          <span>{org.logo}</span>
                          <span>{org.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  to="/org/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
                  style={{ color: "#a8c5a0" }}
                >
                  <LayoutDashboard size={15} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link
                  to="/org/post"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
                  style={{ backgroundColor: "#7c5a3e", color: "#f0e6d8" }}
                >
                  <PlusCircle size={15} />
                  <span className="hidden sm:inline">Post Position</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}