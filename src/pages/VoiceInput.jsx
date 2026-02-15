import { useNavigate } from "react-router-dom";

export default function VoiceInput() {
  const navigate = useNavigate();

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = (event) => {
      navigate("/response", {
        state: { query: event.results[0][0].transcript },
      });
    };
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Speak Your Health Issue</h1>
        <button className="mic-btn" onClick={startListening}>🎙️</button>
      </div>
    </div>
  );
}
