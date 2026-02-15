import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0055A4, #0ea5e9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          textAlign: "center",
          background: "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* LOGO */}
        <div style={{ fontSize: "42px", marginBottom: "12px" }}>
          🩺
        </div>

        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          Swasthya
        </h1>

        <p style={{ fontSize: "16px", marginBottom: "24px", opacity: 0.95 }}>
          Your AI-powered digital health assistant for guidance,
          emergency first aid, and nearby government hospitals.
        </p>

        {/* BUTTONS */}
        <button
          onClick={() => navigate("/login")}
          style={primaryBtn}
        >
          Login / Sign Up
        </button>

        <button
          onClick={() => navigate("/home")}
          style={secondaryBtn}
        >
          Continue as Guest
        </button>

        <p style={{ fontSize: "12px", marginTop: "18px", opacity: 0.8 }}>
          Government-style demo • No data stored
        </p>
      </div>
    </div>
  );
}

const primaryBtn = {
  width: "100%",
  padding: "14px",
  background: "white",
  color: "#0055A4",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  marginBottom: "12px",
};

const secondaryBtn = {
  width: "100%",
  padding: "12px",
  background: "transparent",
  color: "white",
  border: "2px solid white",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
};
