import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
  const navigate = useNavigate();

  const name = localStorage.getItem("userName");
  const phone = localStorage.getItem("userPhone");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "36px",
            borderRadius: "20px",
            width: "380px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#0055A4" }}>
            Citizen Profile
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#4b5563",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            Your personal account details
          </p>

          {/* PROFILE INFO */}
          <div style={infoBox}>
            <span style={label}>Name</span>
            <span style={value}>{name || "Not Available"}</span>
          </div>

          <div style={infoBox}>
            <span style={label}>Mobile Number</span>
            <span style={value}>{phone || "Not Available"}</span>
          </div>

          <div style={infoBox}>
            <span style={label}>Preferred Language</span>
            <span style={value}>English / हिंदी</span>
          </div>

          {/* ACTIONS */}
          <button
            onClick={logout}
            style={{
              width: "100%",
              marginTop: "24px",
              padding: "14px",
              background: "#D32F2F",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

/* -------- STYLES -------- */

const infoBox = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e5e7eb",
};

const label = {
  fontWeight: "600",
  color: "#374151",
};

const value = {
  color: "#111827",
};
