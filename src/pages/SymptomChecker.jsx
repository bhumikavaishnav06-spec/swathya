import { useState } from "react";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en"); // en | hi

  /* -------- SPEECH TO TEXT -------- */
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
  };

  /* -------- TEXT TO SPEECH -------- */
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = language === "hi" ? "hi-IN" : "en-IN";
    speechSynthesis.speak(msg);
  };

  /* -------- SIMPLE AI LOGIC -------- */
  const analyzeSymptoms = () => {
    let response;

    const text = input.toLowerCase();

    if (text.includes("fever") || text.includes("bukhar")) {
      response = {
        category: "Fever / Infection",
        advice:
          language === "hi"
            ? "पानी पिएं, आराम करें और हल्का भोजन लें।"
            : "Drink fluids, take rest, and eat light food.",
        warning:
          language === "hi"
            ? "3 दिन से ज्यादा बुखार रहे तो डॉक्टर से मिलें।"
            : "If fever lasts more than 3 days, visit a doctor.",
      };
    } else if (text.includes("cough") || text.includes("cold")) {
      response = {
        category: "Cold / Cough",
        advice:
          language === "hi"
            ? "गर्म पानी पिएं और भाप लें।"
            : "Drink warm water and take steam.",
        warning:
          language === "hi"
            ? "सांस लेने में तकलीफ हो तो अस्पताल जाएं।"
            : "Visit hospital if breathing difficulty occurs.",
      };
    } else if (text.includes("stomach") || text.includes("diarrhea")) {
      response = {
        category: "Stomach Issue",
        advice:
          language === "hi"
            ? "ORS पिएं और साफ खाना खाएं।"
            : "Drink ORS and eat clean food.",
        warning:
          language === "hi"
            ? "खून या तेज कमजोरी हो तो डॉक्टर से मिलें।"
            : "See a doctor if blood or severe weakness occurs.",
      };
    } else {
      response = {
        category: "General Health Advice",
        advice:
          language === "hi"
            ? "कृपया नजदीकी स्वास्थ्य केंद्र से संपर्क करें।"
            : "Please consult your nearest health center.",
        warning:
          language === "hi"
            ? "लक्षण बढ़ने पर तुरंत डॉक्टर से मिलें।"
            : "Visit a doctor if symptoms worsen.",
      };
    }

    setResult(response);
    speak(
      `${response.category}. ${response.advice}. Warning: ${response.warning}`
    );
  };

  return (
    <div style={page}>
      <h1 style={title}>🤖 Symptom Checker</h1>
      <p style={subtitle}>
        Speak or type your symptoms to get instant guidance
      </p>

      {/* Language Toggle */}
      <div style={langRow}>
        <button
          style={language === "en" ? langActive : langBtn}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          style={language === "hi" ? langActive : langBtn}
          onClick={() => setLanguage("hi")}
        >
          हिंदी
        </button>
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          language === "hi"
            ? "अपने लक्षण लिखें या बोलें"
            : "Type or speak your symptoms"
        }
        style={inputBox}
      />

      {/* Actions */}
      <div style={btnRow}>
        <button style={primaryBtn} onClick={analyzeSymptoms}>
          Analyze
        </button>
        <button style={micBtn} onClick={startListening}>
          🎙️ Speak
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={resultCard}>
          <h3>🩺 {result.category}</h3>
          <p><b>Advice:</b> {result.advice}</p>
          <p style={warning}>🚨 {result.warning}</p>
        </div>
      )}
    </div>
  );
}

/* -------- STYLES -------- */

const page = {
  padding: "30px",
  maxWidth: "700px",
  margin: "auto",
};

const title = { color: "#0055A4" };
const subtitle = { color: "#555", marginBottom: "20px" };

const langRow = { display: "flex", gap: "10px", marginBottom: "15px" };

const langBtn = {
  padding: "6px 14px",
  border: "1px solid #ccc",
  background: "#f4f7f9",
  cursor: "pointer",
};

const langActive = {
  ...langBtn,
  background: "#0055A4",
  color: "white",
};

const inputBox = {
  width: "100%",
  height: "100px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnRow = {
  display: "flex",
  gap: "12px",
  marginTop: "15px",
};

const primaryBtn = {
  background: "#0055A4",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const micBtn = {
  background: "#138808",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const resultCard = {
  marginTop: "25px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
};

const warning = {
  color: "#D32F2F",
  fontWeight: "600",
};
