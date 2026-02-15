import { useLocation, useNavigate } from "react-router-dom";

export default function Response() {
  const location = useLocation();
  const navigate = useNavigate();

  // SAFE fallback
  const userInput = location.state?.input || "No symptom provided";

  const aiResponse =
    location.state?.response ||
    "Please enter your symptoms again to receive guidance.";

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(aiResponse);
    msg.lang = "en-IN";
    speechSynthesis.speak(msg);
  };

  return (
    <div style={page}>
      <h1 style={title}>AI Health Guidance</h1>

      <div style={card}>
        <p><b>Your input:</b> {userInput}</p>
        <p style={{ marginTop: "10px" }}>{aiResponse}</p>

        <button style={voiceBtn} onClick={speak}>
          🔊 Listen to Guidance
        </button>
      </div>

      <div style={actions}>
        <button style={navBtn} onClick={() => navigate("/hospitals")}>
          🏥 Find Nearby Government Hospitals
        </button>

        <button style={navBtn} onClick={() => navigate("/first-aid")}>
          🚨 Emergency First Aid
        </button>

        <button style={backBtn} onClick={() => navigate("/home")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  padding: "30px",
  maxWidth: "800px",
  margin: "auto",
};

const title = {
  color: "#0055A4",
  marginBottom: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
};

const voiceBtn = {
  marginTop: "15px",
  padding: "10px 14px",
  background: "#138808",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const actions = {
  marginTop: "25px",
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const navBtn = {
  background: "#0055A4",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const backBtn = {
  background: "#777",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
