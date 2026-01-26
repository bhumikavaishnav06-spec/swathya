import { pregnancyCare, childCare } from "../data/maternalChildData";

export default function MaternalChild() {
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    speechSynthesis.speak(msg);
  };

  return (
    <div style={page}>
      <h1 style={title}>🤰 Maternal & Child Health</h1>
      <p style={subtitle}>
        Government-supported guidance for mothers and children
      </p>

      {/* Pregnancy Care */}
      <section style={section}>
        <h2>🤰 Pregnancy Care (Month-wise)</h2>

        {pregnancyCare.map((item, index) => (
          <div key={index} style={card}>
            <h3>{item.month}</h3>
            <ul>
              {item.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <p style={warning}>🚨 {item.warning}</p>

            <button
              style={voiceBtn}
              onClick={() =>
                speak(
                  `${item.month}. ${item.tips.join(
                    ". "
                  )}. Warning signs: ${item.warning}`
                )
              }
            >
              🔊 Listen
            </button>
          </div>
        ))}
      </section>

      {/* Child Care */}
      <section style={section}>
        <h2>👶 Child Health & Nutrition</h2>

        {childCare.map((item, index) => (
          <div key={index} style={card}>
            <h3>{item.age}</h3>
            <ul>
              {item.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <button
              style={voiceBtn}
              onClick={() =>
                speak(`${item.age}. ${item.tips.join(". ")}`)
              }
            >
              🔊 Listen
            </button>
          </div>
        ))}
      </section>

      <p style={footerNote}>
        ✔ Information based on Ministry of Health & Family Welfare guidelines
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

const title = {
  color: "#0055A4",
};

const subtitle = {
  color: "#555",
  marginBottom: "30px",
};

const section = {
  marginBottom: "40px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px",
};

const warning = {
  color: "#D32F2F",
  fontWeight: "600",
};

const voiceBtn = {
  marginTop: "10px",
  padding: "8px 14px",
  background: "#138808",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const footerNote = {
  marginTop: "30px",
  fontSize: "14px",
  color: "#666",
};
