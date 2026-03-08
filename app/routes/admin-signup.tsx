import { useState } from "react";
import { Leaf, Building2, Mail, Lock, User, Globe } from "lucide-react";
import { useNavigate } from "react-router";

export default function AdminSignupPage() {
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      role: "organization",
      organizationName,
      contactName,
      email,
      website,
      password,
    });

    navigate("/admin-login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #3d6b4f 100%)",
      }}
      className="flex items-center justify-center px-4 py-10"
    >
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          backgroundColor: "#fff9f2",
          boxShadow: "0 10px 35px rgba(0,0,0,0.18)",
          border: "1.5px solid #e8ddd0",
        }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf size={24} style={{ color: "#4a7c59" }} />
            <h1 style={{ color: "#2c1e12", fontWeight: 800, fontSize: "1.6rem" }}>
              RootedGood
            </h1>
          </div>
          <p style={{ color: "#7c5a3e", fontSize: "14px" }}>
            Create your organization account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Organization Name
            </label>
            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="text"
                placeholder="Enter organization name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Contact Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="text"
                placeholder="Enter contact person name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Organization Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="email"
                placeholder="organization@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Website
            </label>
            <div className="relative">
              <Globe
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="url"
                placeholder="https://yourorganization.org"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl py-3 transition-all"
            style={{
              backgroundColor: "#4a7c59",
              color: "#d4e8d8",
              fontWeight: 700,
            }}
          >
            Create Organization Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm" style={{ color: "#7c5a3e" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/admin-login")}
            style={{ color: "#4a7c59", fontWeight: 700 }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}