import { useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { useApp } from "app/context/AppContext";
import type { Position, Volunteer } from "app/data/mockData";

type FormState = {
  title: string;
  description: string;
  location: string;
  date: string;
  urgency: "low" | "medium" | "high" | "critical";
  difficulty: "easy" | "medium" | "hard";
  skillsNeeded: string;
  duration: string;
  volunteersNeeded: number;
  expiryDate: string;
  donationUrl: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  location: "",
  date: "",
  urgency: "medium",
  difficulty: "medium",
  skillsNeeded: "",
  duration: "",
  volunteersNeeded: 1,
  expiryDate: "",
  donationUrl: "",
};

function OrgDashboardBody() {
  const {
    currentOrg,
    getOrgPositions,
    getApplicantsForPosition,
    confirmCompletion,
    postPosition,
    createPositionFromForm,
  } = useApp();
  const orgPositions = useMemo(() => getOrgPositions(currentOrg.id), [getOrgPositions, currentOrg.id]);
  const [selectedPositionId, setSelectedPositionId] = useState<string>("");
  const [applicants, setApplicants] = useState<Volunteer[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const selectedPosition: Position | undefined = orgPositions.find(
    (position) => position.id === selectedPositionId
  );

  useEffect(() => {
    if (!selectedPositionId) return;
    let mounted = true;
    async function loadApplicants() {
      setLoadingApplicants(true);
      const data = await getApplicantsForPosition(selectedPositionId);
      if (!mounted) return;
      setApplicants(data);
      setLoadingApplicants(false);
    }
    void loadApplicants();
    return () => {
      mounted = false;
    };
  }, [selectedPositionId, getApplicantsForPosition]);

  async function handleConfirm(volunteer: Volunteer) {
    if (!selectedPosition) return;
    await confirmCompletion(
      selectedPosition.id,
      volunteer.id,
      4,
      `${volunteer.name} completed assigned duties successfully.`
    );
    const updated = await getApplicantsForPosition(selectedPosition.id);
    setApplicants(updated);
  }

  async function handlePostSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const skillList = form.skillsNeeded
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      orgId: currentOrg.id,
      skillsNeeded: skillList,
    };

    await createPositionFromForm(payload);
    postPosition({
      orgId: currentOrg.id,
      title: form.title,
      description: form.description,
      requirements: `Difficulty: ${form.difficulty}`,
      skills: skillList,
      location: form.location,
      city: currentOrg.city,
      state: currentOrg.state,
      date: form.date,
      endDate: form.expiryDate || undefined,
      month: form.date
        ? new Date(form.date + "T12:00:00").toLocaleDateString("en-US", { month: "long" })
        : "March",
      timeCommitment: "Half day",
      urgency: form.urgency,
      category: currentOrg.category,
      spotsTotal: Number(form.volunteersNeeded),
      spotsAvailable: Number(form.volunteersNeeded),
      image:
        "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    });

    setForm(initialForm);
    setSubmitting(false);
  }

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 style={{ color: "#2c1e12", fontWeight: 800, fontSize: "2rem" }}>Organization Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#7c5a3e" }}>
          {currentOrg.name}
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <section
            className="rounded-3xl p-5"
            style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
          >
            <h2 style={{ color: "#2c1e12", fontWeight: 700 }}>Posted Positions</h2>
            <div className="mt-3 space-y-3">
              {orgPositions.length === 0 && (
                <p className="text-sm" style={{ color: "#a08878" }}>
                  No posted positions yet.
                </p>
              )}
              {orgPositions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => setSelectedPositionId(position.id)}
                  className="w-full text-left p-3 rounded-2xl text-sm"
                  style={{
                    backgroundColor:
                      selectedPositionId === position.id ? "#eef7f0" : "#f5f0e8",
                    border: selectedPositionId === position.id ? "1px solid #b8dfc4" : "1px solid transparent",
                    color: "#4a2f1a",
                  }}
                >
                  <p style={{ fontWeight: 700 }}>{position.title}</p>
                  <p style={{ color: "#7c5a3e" }}>{position.date}</p>
                </button>
              ))}
            </div>
          </section>

          <section
            className="rounded-3xl p-5"
            style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
          >
            <h2 style={{ color: "#2c1e12", fontWeight: 700 }}>Applicants</h2>
            {!selectedPosition && (
              <p className="mt-3 text-sm" style={{ color: "#a08878" }}>
                Select a position to view applicants.
              </p>
            )}
            {selectedPosition && (
              <div className="mt-3 space-y-3">
                <p className="text-sm" style={{ color: "#7c5a3e" }}>
                  For: <strong>{selectedPosition.title}</strong>
                </p>
                {loadingApplicants && (
                  <p className="text-sm" style={{ color: "#a08878" }}>
                    Loading applicants...
                  </p>
                )}
                {!loadingApplicants && applicants.length === 0 && (
                  <p className="text-sm" style={{ color: "#a08878" }}>
                    No applicants yet.
                  </p>
                )}
                {applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="p-3 rounded-2xl flex items-center justify-between gap-3"
                    style={{ backgroundColor: "#f5f0e8" }}
                  >
                    <div>
                      <p style={{ color: "#2c1e12", fontWeight: 700 }}>{applicant.name}</p>
                      <p className="text-sm" style={{ color: "#7c5a3e" }}>
                        {applicant.email}
                      </p>
                    </div>
                    <button
                      onClick={() => void handleConfirm(applicant)}
                      className="px-3 py-2 rounded-xl text-sm"
                      style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700 }}
                    >
                      Confirm Completion
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section
          className="rounded-3xl p-5 mt-6"
          style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
        >
          <h2 style={{ color: "#2c1e12", fontWeight: 700 }}>Post a Position</h2>
          <form className="mt-4 grid md:grid-cols-2 gap-4" onSubmit={handlePostSubmit}>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              required
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Location"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
              className="px-4 py-3 rounded-xl text-sm md:col-span-2"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              required
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <select
              value={form.urgency}
              onChange={(e) => setForm((prev) => ({ ...prev, urgency: e.target.value as FormState["urgency"] }))}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            >
              <option value="low">Urgency: Low</option>
              <option value="medium">Urgency: Medium</option>
              <option value="high">Urgency: High</option>
              <option value="critical">Urgency: Critical</option>
            </select>
            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, difficulty: e.target.value as FormState["difficulty"] }))
              }
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            >
              <option value="easy">Difficulty: Easy</option>
              <option value="medium">Difficulty: Medium</option>
              <option value="hard">Difficulty: Hard</option>
            </select>
            <input
              required
              value={form.skillsNeeded}
              onChange={(e) => setForm((prev) => ({ ...prev, skillsNeeded: e.target.value }))}
              placeholder="Skills needed (comma separated)"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              required
              value={form.duration}
              onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
              placeholder="Duration"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              required
              min={1}
              type="number"
              value={form.volunteersNeeded}
              onChange={(e) => setForm((prev) => ({ ...prev, volunteersNeeded: Number(e.target.value) }))}
              placeholder="Volunteers needed"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <input
              value={form.donationUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, donationUrl: e.target.value }))}
              placeholder="Optional donation URL"
              className="px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#f5f0e8", color: "#2c1e12" }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 700 }}
            >
              {submitting ? "Posting..." : "Post Position"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default function OrgDashboard() {
  return (
    <ProtectedRoute allowedRoles={["ORG"]}>
      <OrgDashboardBody />
    </ProtectedRoute>
  );
}
