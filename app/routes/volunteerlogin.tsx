import { useState } from "react";
import { Leaf, User, Building2, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"volunteer" | "organization">("volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ role, email, password });

    if (role === "volunteer") {
      navigate("/home");
    } else {
      navigate("/admin-login");
    }
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
            Sign in to continue making a difference
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
            Choose account type
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("volunteer")}
              className="rounded-2xl p-4 text-left transition-all"
              style={{
                backgroundColor: role === "volunteer" ? "#4a7c59" : "#f0ede8",
                color: role === "volunteer" ? "#d4e8d8" : "#4a2f1a",
                border: role === "volunteer" ? "2px solid #3d6b4f" : "1.5px solid #e8ddd0",
              }}
            >
              <User size={20} className="mb-2" />
              <div style={{ fontWeight: 700, fontSize: "14px" }}>Volunteer</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Find opportunities</div>
            </button>

            <button
              type="button"
              onClick={() => setRole("organization")}
              className="rounded-2xl p-4 text-left transition-all"
              style={{
                backgroundColor: role === "organization" ? "#4a7c59" : "#f0ede8",
                color: role === "organization" ? "#d4e8d8" : "#4a2f1a",
                border: role === "organization" ? "2px solid #3d6b4f" : "1.5px solid #e8ddd0",
              }}
            >
              <Building2 size={20} className="mb-2" />
              <div style={{ fontWeight: 700, fontSize: "14px" }}>Admin / Business</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Post volunteer roles</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="email"
                placeholder={role === "organization" ? "organization@email.com" : "volunteer@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
                style={{
                  backgroundColor: "#fffdf8",
                  border: "1.5px solid #e8ddd0",
                  color: "#2c1e12",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2" style={{ color: "#7c5a3e" }}>
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" style={{ color: "#4a7c59", fontWeight: 600 }}>
              Forgot password?
            </button>
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
            Sign in as {role === "volunteer" ? "Volunteer" : "Admin / Business"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm" style={{ color: "#7c5a3e" }}>
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate(role === "volunteer" ? "/volunteer-signup" : "/admin-signup")}
            style={{ color: "#4a7c59", fontWeight: 700 }}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}