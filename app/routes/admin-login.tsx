import { useState } from "react";
import { Building2, Mail, Lock, Leaf } from "lucide-react";
import { useNavigate } from "react-router";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });

    // Later connect to backend auth
    navigate("/admin-dashboard");
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf size={24} style={{ color: "#4a7c59" }} />
            <h1 style={{ color: "#2c1e12", fontWeight: 800, fontSize: "1.6rem" }}>
              RootedGood
            </h1>
          </div>

          <p style={{ color: "#7c5a3e", fontSize: "14px" }}>
            Organization / Business Login
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label
              className="block mb-1 text-sm"
              style={{ color: "#4a2f1a", fontWeight: 600 }}
            >
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
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-1 text-sm"
              style={{ color: "#4a2f1a", fontWeight: 600 }}
            >
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

          {/* Remember / forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2" style={{ color: "#7c5a3e" }}>
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" style={{ color: "#4a7c59", fontWeight: 600 }}>
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-xl py-3 transition-all"
            style={{
              backgroundColor: "#4a7c59",
              color: "#d4e8d8",
              fontWeight: 700,
            }}
          >
            Login to Organization Account
          </button>
        </form>

        {/* Signup */}
        <div className="mt-6 text-center text-sm" style={{ color: "#7c5a3e" }}>
          Don’t have an organization account?{" "}
          <button
            onClick={() => navigate("/admin-signup")}
            style={{ color: "#4a7c59", fontWeight: 700 }}
          >
            Register Organization
          </button>
        </div>

        {/* Back to volunteer login */}
      <div className="mt-3 text-center text-sm" style={{ color: "#7c5a3e" }}>
          Volunteer{" "}
          <button
            onClick={() => navigate("/")}
            style={{ color: "#4a7c59", fontWeight: 700 }}
          >
            Back to Volunteer Signup
          </button>
        </div>
      </div>
    </div>
  );
}