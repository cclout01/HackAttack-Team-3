import { Leaf } from "lucide-react";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #3d6b4f 100%)",
      }}
      className="flex items-center justify-center px-4"
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center"
        style={{
          backgroundColor: "#fff9f2",
          boxShadow: "0 10px 35px rgba(0,0,0,0.18)",
          border: "1.5px solid #e8ddd0",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf size={24} style={{ color: "#4a7c59" }} />
          <h1 style={{ color: "#2c1e12", fontWeight: 800, fontSize: "1.6rem" }}>
            RootedGood
          </h1>
        </div>

        {/* Message */}
        <h2
          className="mb-3"
          style={{ color: "#4a2f1a", fontWeight: 700, fontSize: "1.3rem" }}
        >
          You have been logged out
        </h2>

        <p className="mb-6" style={{ color: "#7c5a3e", fontSize: "14px" }}>
          Thank you for volunteering your time. We hope to see you again soon!
        </p>

        {/* Login Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full rounded-xl py-3"
          style={{
            backgroundColor: "#4a7c59",
            color: "#d4e8d8",
            fontWeight: 700,
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}