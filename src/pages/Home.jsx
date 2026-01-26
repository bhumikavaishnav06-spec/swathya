import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  // 🎙️ Voice Input (Web Speech API)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const submitQuery = () => {
    if (!text.trim()) {
      alert("Please speak or type your health issue");
      return;
    }

    navigate("/response", {
      state: { query: text },
    });
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "linear-gradient(to right, #bae6fd, #99f6e4)",
        }}
      >
        <h1>Your Health, Your Voice – Anytime, Anywhere</h1>
        <p style={{ maxWidth: "700px", margin: "12px auto" }}>
          AI-powered guidance, emergency first-aid, and nearby government
          hospitals at your fingertips.
        </p>

        {/* VOICE + TEXT INPUT CARD */}
        <div
          style={{
            maxWidth: "520px",
            margin: "40px auto",
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            textAlign: "left",
          }}
        >
          <h3>🎙️ Voice & Text Input</h3>
          <p style={{ color: "#374151" }}>
            Speak or type your health concern.
          </p>

          <input
            type="text"
            placeholder="Type your health problem here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <button
              className="btn-primary"
              style={{
                flex: 1,
                background: listening ? "#b91c1c" : "#083344",
              }}
              onClick={startListening}
            >
              {listening ? "Listening..." : "🎤 Speak"}
            </button>

            <button
              className="btn-outline"
              style={{ flex: 1 }}
              onClick={submitQuery}
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="features"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "40px 20px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <div className="feature-card">
          <h3>🚨 Emergency First Aid</h3>
          <p>Offline step-by-step emergency guidance.</p>
        </div>

        <div className="feature-card">
          <h3>📡 Offline Access</h3>
          <p>Essential health support without internet.</p>
        </div>

        <div className="feature-card">
          <h3>🏥 Hospital Finder</h3>
          <p>Locate nearby government hospitals.</p>
        </div>

        <div className="feature-card">
          <h3>🗣️ Voice Support</h3>
          <p>Accessible for elderly and low-literacy users.</p>
        </div>
      </section>

      {/* FIND HOSPITAL NEAR ME */}
      <section
        style={{
          maxWidth: "900px",
          margin: "20px auto",
          padding: "24px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>🏥 Find Hospital Near Me</h2>
        <p style={{ color: "#374151" }}>
          Locate nearby government hospitals, PHCs, and CHCs using your location.
        </p>

        <button
          className="btn-primary"
          onClick={() => navigate("/hospitals")}
        >
          Use My Location
        </button>
      </section>

      {/* EMERGENCY CTA */}
      <section
        className="emergency"
        style={{
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <button
          style={{
            background: "#D32F2F",
            color: "white",
            padding: "16px 28px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/first-aid")}
        >
          🚑 Emergency Help Now
        </button>
      </section>
    </>
  );
}
