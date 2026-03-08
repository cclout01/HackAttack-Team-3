import { useParams, Link } from "react-router";
import { ArrowLeft, Download, Share2, Leaf, Award, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Certificate() {
  const { completionId } = useParams<{ completionId: string }>();
  const { getCompletion, getPosition, getOrg, getVolunteer } = useApp();

  const completion = getCompletion(completionId!);
  const position = completion ? getPosition(completion.positionId) : undefined;
  const org = position ? getOrg(position.orgId) : undefined;
  const volunteer = completion ? getVolunteer(completion.volunteerId) : undefined;

  if (!completion || !position || !org || !volunteer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
        <h2 style={{ color: "#4a2f1a" }}>Certificate not found</h2>
        <Link to="/volunteer/profile" className="mt-4 underline" style={{ color: "#4a7c59" }}>
          Back to Profile
        </Link>
      </div>
    );
  }

  const completedDate = new Date(completion.completedAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const confirmedDate = new Date(completion.confirmedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Back bar */}
      <div style={{ backgroundColor: "#fff9f2", borderBottom: "1px solid #e8ddd0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/volunteer/profile"
            className="flex items-center gap-2 text-sm"
            style={{ color: "#7c5a3e" }}
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm"
              style={{ backgroundColor: "#f0ede8", color: "#7c5a3e" }}
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Certificate Card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #fff9f2 0%, #f5f0e8 100%)",
            border: "2px solid #d4b896",
            boxShadow: "0 8px 40px rgba(74,47,26,0.15), 0 2px 8px rgba(74,47,26,0.08)",
          }}
        >
          {/* Decorative top border */}
          <div
            className="h-3"
            style={{ background: "linear-gradient(90deg, #4a7c59, #7c5a3e, #4a7c59)" }}
          />

          {/* Inner certificate content */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#4a7c59" }}
                >
                  <Leaf size={24} color="#d4e8d8" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#7c5a3e", letterSpacing: "0.15em" }}>
                    RootedGood
                  </p>
                  <p className="text-xs" style={{ color: "#a08878" }}>Volunteer Recognition Program</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4b896)" }} />
                <Award size={20} style={{ color: "#d4813a" }} />
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #d4b896, transparent)" }} />
              </div>

              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#a08878", letterSpacing: "0.2em" }}
              >
                Certificate of Completion
              </p>
              <p className="text-base mb-2" style={{ color: "#7c5a3e" }}>This is to certify that</p>
              <h1
                style={{
                  color: "#2c1e12",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {volunteer.name}
              </h1>
            </div>

            {/* Main text */}
            <div
              className="text-center mb-8 max-w-2xl mx-auto"
              style={{ color: "#4a2f1a", fontSize: "16px", lineHeight: 1.8 }}
            >
              <p>
                has successfully completed their volunteer service as a{" "}
                <strong style={{ color: "#2c1e12" }}>{position.title}</strong>{" "}
                with{" "}
                <strong style={{ color: "#2c1e12" }}>{org.name}</strong>.
              </p>
              <p className="mt-3">
                This role was performed on{" "}
                <strong>{completedDate}</strong>{" "}
                at{" "}
                <strong>{position.location}</strong>,{" "}
                {position.city}, {position.state}, contributing{" "}
                <strong style={{ color: "#4a7c59" }}>{completion.hoursServed} hours</strong>{" "}
                of dedicated volunteer service to the community.
              </p>
            </div>

            {/* Details grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-2xl"
              style={{ backgroundColor: "#f0ede8" }}
            >
              <CertDetail icon={<Leaf size={15} />} label="Role" value={position.category} />
              <CertDetail icon={<Clock size={15} />} label="Hours Served" value={`${completion.hoursServed} hours`} />
              <CertDetail
                icon={<Calendar size={15} />}
                label="Date"
                value={new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              />
              <CertDetail icon={<MapPin size={15} />} label="Location" value={`${position.city}, ${position.state}`} />
            </div>

            {/* Org message */}
            <div
              className="p-6 rounded-2xl mb-8 text-center"
              style={{
                backgroundColor: "#fff9f2",
                border: "1.5px solid #d4b896",
              }}
            >
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#a08878", letterSpacing: "0.1em" }}>
                A note from {org.name}
              </p>
              <span className="text-4xl" style={{ lineHeight: 1 }}>{org.logo}</span>
              <p
                className="mt-3 text-base"
                style={{ color: "#4a2f1a", lineHeight: 1.8, fontStyle: "italic", maxWidth: "520px", margin: "12px auto 0" }}
              >
                "{completion.orgNote}"
              </p>
            </div>

            {/* Confirmed banner */}
            <div
              className="flex items-center justify-center gap-3 py-4 rounded-2xl mb-8"
              style={{ backgroundColor: "#eef7f0", border: "1.5px solid #b8dfc4" }}
            >
              <CheckCircle size={18} style={{ color: "#4a7c59" }} />
              <p className="text-sm" style={{ color: "#2d5016", fontWeight: 600 }}>
                Verified and confirmed by {org.name} on {confirmedDate}
              </p>
            </div>

            {/* Footer signatures */}
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div
                  className="text-2xl mb-1"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#2c1e12",
                    fontStyle: "italic",
                    borderBottom: "1.5px solid #4a2f1a",
                    paddingBottom: "4px",
                    paddingRight: "24px",
                  }}
                >
                  {org.name}
                </div>
                <p className="text-xs" style={{ color: "#a08878" }}>Organization Representative</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "#a08878" }}
                  >
                    Certificate ID
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#7c5a3e", fontFamily: "monospace" }}
                  >
                    {completion.id.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bottom border */}
          <div
            className="h-3"
            style={{ background: "linear-gradient(90deg, #7c5a3e, #4a7c59, #7c5a3e)" }}
          />
        </div>

        {/* Full text description below */}
        <div
          className="mt-6 rounded-3xl p-6"
          style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
        >
          <h3 style={{ color: "#2c1e12", fontWeight: 700, marginBottom: "12px" }}>
            Your Service Summary
          </h3>
          <p style={{ color: "#4a2f1a", lineHeight: 1.9, fontSize: "15px" }}>
            {volunteer.name} completed the volunteer role of <strong>{position.title}</strong> with{" "}
            <strong>{org.name}</strong> — a {org.category.toLowerCase()} organization based in {org.city}, {org.state}. 
            This role took place on {completedDate} at {position.location}, {position.city}, {position.state}. 
            The total time contributed was <strong>{completion.hoursServed} hours</strong>, with a commitment 
            level of <strong>{position.timeCommitment}</strong>. This service has been officially confirmed 
            and verified by {org.name} on {confirmedDate}. 
            {org.name} shared the following about this volunteer's contribution: <em>"{completion.orgNote}"</em>
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
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
    </div>
  );
}

function CertDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-1" style={{ color: "#7c5a3e" }}>
        {icon}
        <span className="text-xs uppercase" style={{ color: "#a08878", letterSpacing: "0.05em", fontWeight: 600 }}>
          {label}
        </span>
      </div>
      <p className="text-sm" style={{ color: "#2c1e12", fontWeight: 700 }}>
        {value}
      </p>
    </div>
  );
}
