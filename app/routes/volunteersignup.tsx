import { useState } from "react";
import { Leaf, User, Mail, Lock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

export default function VolunteerSignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      role: "volunteer",
      fullName,
      email,
      city,
      password,
    });

    navigate("/home");
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
            Create your volunteer account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm" style={{ color: "#4a2f1a", fontWeight: 600 }}>
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                placeholder="volunteer@email.com"
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
              City
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#a08878" }}
              />
              <input
                type="text"
                placeholder="Kelowna, BC"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
            Create Volunteer Account
          </button>
        </form>

         <div className="mt-3 text-center text-sm" style={{ color: "#7c5a3e" }}>
          Volunteer Login{" "}
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