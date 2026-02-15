import { useState } from "react";

export default function Schemes() {
  const [income, setIncome] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [eligible, setEligible] = useState(null);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    speechSynthesis.speak(msg);
  };

  const checkEligibility = () => {
    if (income === "low" || isPregnant) {
      setEligible(true);
      speak("You may be eligible for government health schemes.");
    } else {
      setEligible(false);
      speak("You may not be eligible, but please confirm at your nearest health center.");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>🏥 Government Health Scheme Finder</h1>
      <p style={subtitle}>
        Check eligibility and understand government health schemes easily
      </p>

      {/* Ayushman Bharat */}
      <div style={card}>
        <h2 style={schemeTitle}>✅ Ayushman Bharat – PMJAY</h2>
        <p>
          Provides <b>₹5 lakh health insurance</b> per family per year for
          cashless treatment.
        </p>

        <h4>🧾 Who can apply?</h4>
        <ul>
          <li>Families listed in SECC database</li>
          <li>Economically weaker sections</li>
          <li>Rural and urban poor households</li>
        </ul>

        <div style={actionRow}>
          <button style={voiceBtn} onClick={() =>
            speak("Ayushman Bharat provides five lakh rupees health insurance to eligible families.")
          }>
            🔊 Listen
          </button>

          <a
            href="https://pmjay.gov.in"
            target="_blank"
            rel="noreferrer"
            style={linkBtn}
          >
            🔗 Official Website
          </a>
        </div>

        <button style={callBtn} onClick={() => (window.location.href = "tel:14555")}>
          📞 Call Helpline 14555
        </button>
      </div>

      {/* Janani Suraksha Yojana */}
      <div style={card}>
        <h2 style={schemeTitle}>🤰 Janani Suraksha Yojana (JSY)</h2>
        <p>
          Encourages <b>safe institutional delivery</b> by providing financial
          assistance to pregnant women.
        </p>

        <h4>🧾 Who can apply?</h4>
        <ul>
          <li>Pregnant women from BPL families</li>
          <li>Rural mothers</li>
          <li>Women registered at government health centers</li>
        </ul>

        <div style={actionRow}>
          <button style={voiceBtn} onClick={() =>
            speak("Janani Suraksha Yojana supports pregnant women for safe hospital delivery.")
          }>
            🔊 Listen
          </button>

          <a
            href="https://nhm.gov.in"
            target="_blank"
            rel="noreferrer"
            style={linkBtn}
          >
            🔗 Official Website
          </a>
        </div>

        <button style={callBtn} onClick={() => (window.location.href = "tel:102")}>
          📞 Call Maternity Helpline 102
        </button>
      </div>

      {/* Eligibility Checker */}
      <div style={card}>
        <h2 style={schemeTitle}>📍 Eligibility Checker</h2>

        <label style={label}>Family Income</label>
        <select
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={input}
        >
          <option value="">Select</option>
          <option value="low">Low Income</option>
          <option value="medium">Middle Income</option>
          <option value="high">High Income</option>
        </select>

        <label style={checkbox}>
          <input
            type="checkbox"
            checked={isPregnant}
            onChange={() => setIsPregnant(!isPregnant)}
          />
          Pregnant Woman in Family
        </label>

        <button style={checkBtn} onClick={checkEligibility}>
          Check Eligibility
        </button>

        {eligible === true && (
          <p style={{ color: "#138808", fontWeight: "600" }}>
            ✅ You may be eligible for government schemes.
          </p>
        )}

        {eligible === false && (
          <p style={{ color: "#D32F2F", fontWeight: "600" }}>
            ❌ Eligibility not confirmed. Visit nearest PHC for details.
          </p>
        )}
      </div>

      <p style={footer}>
        ✔ Verified information • Ministry of Health & Family Welfare
      </p>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  padding: "30px",
  maxWidth: "900px",
  margin: "auto",
};

const title = { color: "#0055A4" };
const subtitle = { color: "#555", marginBottom: "30px" };

const card = {
  background: "#fff",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  marginBottom: "30px",
};

const schemeTitle = { color: "#138808" };

const voiceBtn = {
  background: "#0055A4",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const linkBtn = {
  padding: "8px 14px",
  background: "#FF9933",
  color: "white",
  borderRadius: "6px",
  textDecoration: "none",
};

const callBtn = {
  marginTop: "12px",
  background: "#138808",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const actionRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "10px",
};

const label = { display: "block", marginTop: "10px" };

const input = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
};

const checkbox = { display: "block", marginTop: "10px" };

const checkBtn = {
  marginTop: "12px",
  padding: "10px",
  background: "#0055A4",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

const footer = {
  fontSize: "14px",
  color: "#666",
  marginTop: "20px",
};
