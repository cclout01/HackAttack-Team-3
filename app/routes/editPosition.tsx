import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import type { Urgency, TimeCommitment } from "../data/mockData";

const CATEGORIES = ["Environment", "Food Security", "Animal Welfare", "Education", "Community", "Healthcare", "Arts & Culture", "Elderly Care", "Youth"];
const URGENCIES: { value: Urgency; label: string; desc: string }[] = [
  { value: "low", label: "Low", desc: "Plenty of time to fill" },
  { value: "medium", label: "Medium", desc: "Could use more volunteers" },
  { value: "high", label: "High", desc: "Significantly needed" },
  { value: "critical", label: "Critical", desc: "Urgently needed ASAP" },
];
const TIME_COMMITMENTS: TimeCommitment[] = ["1-2 hours", "Half day", "Full day", "Weekly", "Ongoing"];
const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

export default function EditPosition() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPosition, updatePosition } = useApp();

  const position = getPosition(id!);
  const [form, setForm] = useState(position ?? null);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (position) setForm(position);
  }, [id]);

  if (!form || !position) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
        <h2 style={{ color: "#4a2f1a" }}>Position not found</h2>
        <Link to="/org/dashboard" className="mt-3 underline" style={{ color: "#4a7c59" }}>Back to Dashboard</Link>
      </div>
    );
  }

  const update = (key: string, value: string | number | string[]) => {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      update("skills", [...form.skills, s]);
      setSkillInput("");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePosition(id!, form);
    setSaved(true);
    setTimeout(() => { navigate("/org/dashboard"); }, 1200);
  };

  if (saved) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#f5f0e8" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#d4e8d8" }}>
          <Check size={28} style={{ color: "#2d5016" }} strokeWidth={3} />
        </div>
        <p style={{ color: "#2c1e12", fontWeight: 700 }}>Position updated!</p>
        <p className="text-sm mt-1" style={{ color: "#7c5a3e" }}>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #4a2f1a 0%, #7c5a3e 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/org/dashboard" className="inline-flex items-center gap-2 text-sm mb-4" style={{ color: "#d4b896" }}>
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>
          <h1 style={{ color: "#f0e6d8", fontWeight: 800, fontSize: "1.5rem" }}>Edit Position</h1>
          <p className="text-sm" style={{ color: "#c4a882" }}>{form.title}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSave} className="space-y-5">
          <Section title="Position Details">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Category</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Time Commitment</label>
                <select value={form.timeCommitment} onChange={(e) => update("timeCommitment", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}>
                  {TIME_COMMITMENTS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Description</label>
              <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")} />
            </div>
          </Section>

          <Section title="Urgency">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {URGENCIES.map((u) => (
                <button type="button" key={u.value} onClick={() => update("urgency", u.value)}
                  className="p-3 rounded-2xl text-left transition-all"
                  style={{ border: form.urgency === u.value ? "2px solid #4a7c59" : "1.5px solid #e8ddd0", backgroundColor: form.urgency === u.value ? "#eef7f0" : "#fff9f2" }}>
                  <p className="text-sm" style={{ color: "#2c1e12", fontWeight: 700 }}>{u.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7c5a3e" }}>{u.desc}</p>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Skills">
            <div className="flex gap-2 mb-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Add skill..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")} />
              <button type="button" onClick={addSkill} className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: "#4a7c59", color: "#d4e8d8" }}>
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}>
                  {skill}
                  <button type="button" onClick={() => update("skills", form.skills.filter((s) => s !== skill))}><X size={12} /></button>
                </span>
              ))}
            </div>
          </Section>

          <div className="flex gap-3 pb-8">
            <Link to="/org/dashboard" className="flex-1 py-4 rounded-2xl text-sm text-center" style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}>
              Cancel
            </Link>
            <button type="submit" className="flex-1 py-4 rounded-2xl text-sm" style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700, flex: 2 }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 space-y-4" style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}>
      <h2 style={{ color: "#2c1e12", fontWeight: 700, fontSize: "16px" }}>{title}</h2>
      {children}
    </div>
  );
}
