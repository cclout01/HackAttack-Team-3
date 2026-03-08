import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { createPosition } from "../lib/api";
import type { Urgency, TimeCommitment } from "../data/mockData";

const CATEGORIES = ["Environment", "Food Security", "Animal Welfare", "Education", "Community", "Healthcare", "Arts & Culture", "Elderly Care", "Youth"];
const URGENCIES: { value: Urgency; label: string; desc: string }[] = [
  { value: "low", label: "Low", desc: "Plenty of time to fill" },
  { value: "medium", label: "Medium", desc: "Could use more volunteers" },
  { value: "high", label: "High", desc: "Significantly needed" },
  { value: "critical", label: "Critical", desc: "Urgently needed ASAP" },
];
const TIME_COMMITMENTS: TimeCommitment[] = ["1-2 hours", "Half day", "Full day", "Weekly", "Ongoing"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1772423921198-61a1ccb4b696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1770914755925-6468b9050176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
];

export default function PostPosition() {
  const { currentOrg } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    city: "",
    state: "OR",
    date: "",
    endDate: "",
    month: "March",
    category: "Environment",
    timeCommitment: "Half day" as TimeCommitment,
    urgency: "medium" as Urgency,
    spotsTotal: 10,
    spotsAvailable: 10,
    image: DEFAULT_IMAGES[0],
    orgId: currentOrg.id,
    skills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: string, value: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      update("skills", [...form.skills, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", form.skills.filter((s) => s !== skill));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await createPosition({ ...form, orgId: currentOrg.id });
      setSubmitted(true);
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Could not post position. Check backend server and try again.",
      }));
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#d4e8d8" }}
        >
          <Check size={36} style={{ color: "#2d5016" }} strokeWidth={3} />
        </div>
        <h1 style={{ color: "#2c1e12", fontWeight: 800 }}>Position Posted!</h1>
        <p className="text-sm mt-2 mb-6 max-w-sm" style={{ color: "#7c5a3e" }}>
          Your volunteer position for <strong>{currentOrg.name}</strong> is now live and visible to volunteers.
        </p>
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-2xl text-sm"
            style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
          >
            Browse Positions
          </Link>
          <button
            type="button"
            onClick={() => navigate("/org/dashboard")}
            className="px-5 py-2.5 rounded-2xl text-sm"
            style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #4a2f1a 0%, #7c5a3e 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <button
            type="button"
            onClick={() => navigate("/org/dashboard")}
            className="inline-flex items-center gap-2 text-sm mb-4"
            style={{ color: "#d4b896" }}
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentOrg.logo}</span>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#c4a882" }}>{currentOrg.name}</p>
              <h1 style={{ color: "#f0e6d8", fontWeight: 800, fontSize: "1.5rem" }}>Post a Volunteer Position</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.form && (
            <p className="text-sm" style={{ color: "#c0392b" }}>
              {errors.form}
            </p>
          )}

          {/* Basic Info */}
          <FormSection title="Position Details">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                Position Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g., Trail Restoration Volunteer"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{
                  backgroundColor: "#fff9f2",
                  border: errors.title ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = errors.title ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0")}
              />
              {errors.title && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Time Commitment</label>
                <select
                  value={form.timeCommitment}
                  onChange={(e) => update("timeCommitment", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                >
                  {TIME_COMMITMENTS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe what volunteers will be doing, what they'll experience, and why it matters..."
                rows={5}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                style={{
                  backgroundColor: "#fff9f2",
                  border: errors.description ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = errors.description ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0")}
              />
              {errors.description && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                Requirements & Notes
              </label>
              <textarea
                value={form.requirements}
                onChange={(e) => update("requirements", e.target.value)}
                placeholder="Any physical requirements, age limits, background check needs, what to bring, etc."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
              />
            </div>
          </FormSection>

          {/* Location & Date */}
          <FormSection title="Location & Schedule">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                Venue / Location Name *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g., Forest Park Main Trailhead"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{
                  backgroundColor: "#fff9f2",
                  border: errors.location ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                onBlur={(e) => (e.target.style.border = errors.location ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0")}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{
                    backgroundColor: "#fff9f2",
                    border: errors.city ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0",
                    color: "#2c1e12",
                  }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = errors.city ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>State</label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                >
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Start Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => {
                    const d = e.target.value;
                    const m = d ? new Date(d + "T12:00:00").toLocaleString("en-US", { month: "long" }) : "March";
                    update("date", d);
                    update("month", m);
                  }}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{
                    backgroundColor: "#fff9f2",
                    border: errors.date ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0",
                    color: "#2c1e12",
                  }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = errors.date ? "1.5px solid #c0392b" : "1.5px solid #e8ddd0")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>End Date (optional)</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => update("endDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
                />
              </div>
            </div>
          </FormSection>

          {/* Urgency */}
          <FormSection title="Urgency Level">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {URGENCIES.map((u) => (
                <button
                  type="button"
                  key={u.value}
                  onClick={() => update("urgency", u.value)}
                  className="p-3 rounded-2xl text-left transition-all"
                  style={{
                    border: form.urgency === u.value ? "2px solid #4a7c59" : "1.5px solid #e8ddd0",
                    backgroundColor: form.urgency === u.value ? "#eef7f0" : "#fff9f2",
                  }}
                >
                  <p className="text-sm" style={{ color: "#2c1e12", fontWeight: 700 }}>{u.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7c5a3e" }}>{u.desc}</p>
                </button>
              ))}
            </div>
          </FormSection>

          {/* Spots & Skills */}
          <FormSection title="Capacity & Skills">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>
                Volunteer Spots Available: <strong>{form.spotsTotal}</strong>
              </label>
              <input
                type="range"
                min={1}
                max={100}
                value={form.spotsTotal}
                onChange={(e) => { update("spotsTotal", Number(e.target.value)); update("spotsAvailable", Number(e.target.value)); }}
                className="w-full accent-[#4a7c59]"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#a08878" }}>
                <span>1</span><span>50</span><span>100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#4a2f1a", fontWeight: 600 }}>Skills & Qualities Needed</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill and press Enter..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0", color: "#2c1e12" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4a7c59")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid #e8ddd0")}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: "#4a7c59", color: "#d4e8d8" }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                    style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Photo */}
          <FormSection title="Cover Photo">
            <p className="text-sm mb-3" style={{ color: "#7c5a3e" }}>Choose a photo that represents your position:</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {DEFAULT_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => update("image", img)}
                  className="relative rounded-2xl overflow-hidden aspect-video transition-all"
                  style={{
                    border: form.image === img ? "3px solid #4a7c59" : "2px solid #e8ddd0",
                    boxShadow: form.image === img ? "0 0 0 2px #4a7c59" : "none",
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {form.image === img && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(74,124,89,0.3)" }}>
                      <Check size={18} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </FormSection>

          {/* Submit */}
          <div className="flex gap-3 pb-8">
            <button
              type="button"
              onClick={() => navigate("/org/dashboard")}
              className="flex-1 py-4 rounded-2xl text-sm text-center"
              style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 flex-1 py-4 rounded-2xl text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700, flex: 2 }}
            >
              🌱 Publish Position
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl p-6 space-y-4"
      style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
    >
      <h2 style={{ color: "#2c1e12", fontWeight: 700, fontSize: "16px" }}>{title}</h2>
      {children}
    </div>
  );
}
