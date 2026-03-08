import { Link } from "react-router";
import { Award, Clock, MapPin, Calendar, CheckCircle, Leaf, ChevronRight, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function VolunteerProfile() {
  const { currentVolunteer, getPosition, getOrg, getVolunteerCompletions, completions } = useApp();

  const signedUpPositions = currentVolunteer.signedUpPositions
    .map((id) => getPosition(id))
    .filter(Boolean);

  const completedPositions = currentVolunteer.completedPositions
    .map((id) => getPosition(id))
    .filter(Boolean);

  const volunteerCompletions = getVolunteerCompletions(currentVolunteer.id);
  const totalHours = volunteerCompletions.reduce((acc, c) => acc + c.hoursServed, 0);

  return (
    <div style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      {/* Profile Hero */}
      <div style={{ background: "linear-gradient(135deg, #4a2f1a 0%, #7c5a3e 60%, #4a7c59 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-4">
            <Link
              to="/home"
              className="inline-block px-4 py-2 rounded-xl text-sm"
              style={{
                backgroundColor: "#4a7c59",
                color: "#d4e8d8",
                fontWeight: 600,
              }}
            >
              ← Back to Home
            </Link>
          </div>
          <div className="flex flex-wrap items-start gap-5">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#4a7c59", color: "#d4e8d8" }}
            >
              <span style={{ fontSize: "28px", fontWeight: 800 }}>{currentVolunteer.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs mb-1 tracking-widest uppercase" style={{ color: "#c4a882" }}>
                Volunteer Profile
              </p>
              <h1 style={{ color: "#f0e6d8", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em" }}>
                {currentVolunteer.name}
              </h1>
              <p className="text-sm" style={{ color: "#d4b896" }}>
                {currentVolunteer.email} · {currentVolunteer.city}, {currentVolunteer.state}
              </p>
              <p className="text-sm mt-2 max-w-md" style={{ color: "#c4a882", lineHeight: 1.6 }}>
                {currentVolunteer.bio}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <Leaf size={18} />, value: signedUpPositions.length, label: "Upcoming Roles" },
              { icon: <CheckCircle size={18} />, value: completedPositions.length, label: "Completed" },
              { icon: <Clock size={18} />, value: `${totalHours}h`, label: "Hours Given" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Skills */}
        <div
          className="rounded-3xl p-5"
          style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
        >
          <h2 style={{ color: "#2c1e12", fontWeight: 700, marginBottom: "12px" }}>My Skills</h2>
          <div className="flex flex-wrap gap-2">
            {currentVolunteer.skills.map((skill) => (
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

        {/* Upcoming / Signed Up */}
        <div>
          <h2 className="mb-3" style={{ color: "#2c1e12", fontWeight: 700 }}>
            Upcoming Commitments
          </h2>
          {signedUpPositions.length === 0 ? (
            <div
              className="rounded-3xl p-8 text-center"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <p style={{ color: "#a08878" }}>No upcoming positions. Browse and sign up for opportunities!</p>
              <Link
                to="/"
                className="inline-block mt-3 px-5 py-2.5 rounded-2xl text-sm"
                style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
              >
                Browse Positions
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {signedUpPositions.map((position) => {
                if (!position) return null;
                const org = getOrg(position.orgId);
                const isPast = new Date(position.date) < new Date();
                return (
                  <Link
                    key={position.id}
                    to={`/position/${position.id}`}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md group"
                    style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
                  >
                    <img
                      src={position.image}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-1" style={{ color: "#2c1e12", fontWeight: 700 }}>
                        {position.title}
                      </p>
                      <p className="text-xs" style={{ color: "#7c5a3e" }}>{org?.name}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="flex items-center gap-1 text-xs" style={{ color: "#a08878" }}>
                          <Calendar size={11} />
                          {new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "#a08878" }}>
                          <MapPin size={11} />
                          {position.city}, {position.state}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPast && (
                        <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#f0ede8", color: "#a08878" }}>
                          Pending Confirmation
                        </span>
                      )}
                      <ChevronRight size={16} style={{ color: "#a08878" }} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Completed Roles */}
        <div>
          <h2 className="mb-3" style={{ color: "#2c1e12", fontWeight: 700 }}>
            Completed Roles {completedPositions.length > 0 && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-sm" style={{ backgroundColor: "#d4e8d8", color: "#2d5016" }}>
                {completedPositions.length}
              </span>
            )}
          </h2>
          {completedPositions.length === 0 ? (
            <div
              className="rounded-3xl p-8 text-center"
              style={{ backgroundColor: "#fff9f2", border: "1.5px solid #e8ddd0" }}
            >
              <Star size={32} style={{ color: "#d4b896", margin: "0 auto 8px" }} />
              <p style={{ color: "#a08878" }}>Your completed roles will appear here once an organization confirms your service.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {completedPositions.map((position) => {
                if (!position) return null;
                const org = getOrg(position.orgId);
                const completion = volunteerCompletions.find((c) => c.positionId === position.id);
                return (
                  <div
                    key={position.id}
                    className="rounded-3xl overflow-hidden"
                    style={{ border: "1.5px solid #b8dfc4", backgroundColor: "#fff9f2" }}
                  >
                    {/* Completion header */}
                    <div
                      className="px-5 py-3 flex items-center gap-2"
                      style={{ backgroundColor: "#eef7f0" }}
                    >
                      <CheckCircle size={15} style={{ color: "#4a7c59" }} />
                      <span className="text-sm" style={{ color: "#2d5016", fontWeight: 700 }}>
                        Role Completed & Confirmed
                      </span>
                      {completion && (
                        <span className="ml-auto text-xs" style={{ color: "#6b9e7a" }}>
                          Confirmed {new Date(completion.confirmedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex gap-4 mb-4">
                        <img
                          src={position.image}
                          alt=""
                          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="text-base" style={{ color: "#2c1e12", fontWeight: 700 }}>{position.title}</p>
                          <p className="text-sm" style={{ color: "#7c5a3e" }}>{org?.name}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "#a08878" }}>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {new Date(position.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {completion?.hoursServed} hours served
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={11} />
                              {position.city}, {position.state}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Org message */}
                      {completion?.orgNote && (
                        <div
                          className="p-4 rounded-2xl mb-4"
                          style={{ backgroundColor: "#f5f0e8", borderLeft: "3px solid #4a7c59" }}
                        >
                          <p className="text-xs mb-1" style={{ color: "#7c5a3e", fontWeight: 600 }}>
                            Message from {org?.name}:
                          </p>
                          <p className="text-sm" style={{ color: "#4a2f1a", lineHeight: 1.7, fontStyle: "italic" }}>
                            "{completion.orgNote}"
                          </p>
                        </div>
                      )}

                      {/* View Certificate button */}
                      {completion && (
                        <Link
                          to={`/certificate/${completion.id}`}
                          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm w-full transition-all hover:opacity-90"
                          style={{ backgroundColor: "#4a7c59", color: "#d4e8d8", fontWeight: 600 }}
                        >
                          <Award size={16} />
                          View Completion Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
