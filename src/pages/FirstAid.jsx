import { useState } from "react";
import Navbar from "../components/Navbar";
import firstAidData from "../data/firstAidData";

export default function FirstAid() {
  const [lang, setLang] = useState("en");
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const speakFirstAid = (item, index) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const textToSpeak = `
      ${item.title[lang]}.
      ${item.steps[lang].join(". ")}.
      Warning. ${item.warning[lang]}
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Navbar />

      <div className="app-container">
        <div className="card">
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h1>
              🚨{" "}
              {lang === "en"
                ? "Emergency First Aid (Offline)"
                : "आपातकालीन प्राथमिक उपचार (ऑफलाइन)"}
            </h1>

            <button
              className="secondary-btn"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
            >
              {lang === "en" ? "हिंदी" : "English"}
            </button>
          </div>

          <p style={{ color: "#374151", marginBottom: "20px" }}>
            {lang === "en"
              ? "These instructions are available without internet connection."
              : "ये निर्देश इंटरनेट के बिना भी उपलब्ध हैं।"}
          </p>

          {/* FIRST AID CARDS */}
          {firstAidData.map((item, index) => (
            <div
              key={index}
              style={{
                borderLeft: "6px solid #D32F2F",
                padding: "18px",
                marginBottom: "24px",
                background: "#fff7ed",
                borderRadius: "10px",
              }}
            >
              {/* TITLE */}
              <h2>
                {item.icon} {item.title[lang]}
              </h2>

              {/* STEPS */}
              <ol>
                {item.steps[lang].map((step, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>
                    {step}
                  </li>
                ))}
              </ol>

              {/* WARNING */}
              <p style={{ color: "#b91c1c", fontWeight: 600 }}>
                ⚠️ {item.warning[lang]}
              </p>

              {/* VOICE BUTTON */}
              <button
                className="btn-primary"
                style={{ marginTop: "12px" }}
                onClick={() => speakFirstAid(item, index)}
              >
                🔊{" "}
                {speakingIndex === index
                  ? lang === "en"
                    ? "Speaking..."
                    : "बोल रहा है..."
                  : lang === "en"
                  ? "Listen"
                  : "सुनें"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
