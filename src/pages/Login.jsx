import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

/* Password strength check */
const isStrongPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [step, setStep] = useState("form"); // form | otp

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const DEMO_OTP = "123456";

  /* ---------- LOGIN ---------- */
  const handleLogin = () => {
    if (!name || !password) {
      alert("Please enter name and password");
      return;
    }

    const storedName = localStorage.getItem("userName");
    const storedPassword = localStorage.getItem("userPassword");

    if (name !== storedName || password !== storedPassword) {
      alert("Invalid credentials");
      return;
    }

    navigate("/home");
  };

  /* ---------- SIGN UP ---------- */
  const sendOtpForSignup = () => {
    if (!name || !phone) {
      alert("Please enter name and mobile number");
      return;
    }
    setStep("otp");
  };

  const createAccount = () => {
    if (otp !== DEMO_OTP) {
      alert("Invalid OTP");
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        "Password must be 8+ characters with uppercase, number & special character"
      );
      return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userPassword", password);

    navigate("/home");
  };

  /* ---------- FORGOT PASSWORD ---------- */
  const sendOtpForReset = () => {
    if (!phone) {
      alert("Enter registered mobile number");
      return;
    }
    setStep("otp");
  };

  const resetPassword = () => {
    if (otp !== DEMO_OTP) {
      alert("Invalid OTP");
      return;
    }

    if (!isStrongPassword(password)) {
      alert("Password does not meet security rules");
      return;
    }

    localStorage.setItem("userPassword", password);
    alert("Password reset successful");

    setMode("login");
    setStep("form");
    setPassword("");
    setOtp("");
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <div style={card}>
          {/* HEADER */}
          <h1 style={title}>Swasthya</h1>
          <p style={subtitle}>
            Government-style digital health access
          </p>

          {/* TABS */}
          {mode !== "forgot" && (
            <div style={tabs}>
              <button
                style={mode === "login" ? tabActive : tab}
                onClick={() => {
                  setMode("login");
                  setStep("form");
                }}
              >
                Login
              </button>
              <button
                style={mode === "signup" ? tabActive : tab}
                onClick={() => {
                  setMode("signup");
                  setStep("form");
                }}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} style={input} />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
              />

              <button style={primaryBtn} onClick={handleLogin}>
                Login
              </button>

              <p style={linkText} onClick={() => setMode("forgot")}>
                Forgot password?
              </p>
            </>
          )}

          {/* SIGN UP */}
          {mode === "signup" && step === "form" && (
            <>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} style={input} />

              <label>Mobile Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

              <button style={primaryBtn} onClick={sendOtpForSignup}>
                Send OTP
              </button>
            </>
          )}

          {mode === "signup" && step === "otp" && (
            <>
              <p style={stepText}>Step 2 of 2 · OTP Verification</p>

              <label>OTP</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} style={input} />

              <label>Create Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
              />

              <button style={primaryBtn} onClick={createAccount}>
                Create Account
              </button>

              <p style={hint}>Demo OTP: 123456</p>
            </>
          )}

          {/* FORGOT PASSWORD */}
          {mode === "forgot" && step === "form" && (
            <>
              <h3 style={smallTitle}>Reset Password</h3>

              <label>Registered Mobile Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

              <button style={primaryBtn} onClick={sendOtpForReset}>
                Send OTP
              </button>

              <p style={linkText} onClick={() => setMode("login")}>
                ← Back to Login
              </p>
            </>
          )}

          {mode === "forgot" && step === "otp" && (
            <>
              <p style={stepText}>OTP Verification</p>

              <label>OTP</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} style={input} />

              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
              />

              <button style={primaryBtn} onClick={resetPassword}>
                Reset Password
              </button>

              <p style={hint}>Demo OTP: 123456</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */

const page = {
  minHeight: "100vh",
  background: "#f4f7f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "white",
  padding: "36px",
  borderRadius: "20px",
  width: "380px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  marginBottom: "4px",
  color: "#0055A4",
};

const subtitle = {
  textAlign: "center",
  fontSize: "14px",
  color: "#4b5563",
  marginBottom: "20px",
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tab = {
  flex: 1,
  padding: "10px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  borderRadius: "8px",
  cursor: "pointer",
};

const tabActive = {
  ...tab,
  background: "#0055A4",
  color: "white",
  border: "none",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  background: "#0055A4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const linkText = {
  marginTop: "12px",
  fontSize: "13px",
  color: "#0055A4",
  cursor: "pointer",
  textAlign: "center",
};

const hint = {
  marginTop: "10px",
  fontSize: "12px",
  textAlign: "center",
  color: "#6b7280",
};

const stepText = {
  fontSize: "13px",
  marginBottom: "10px",
  color: "#374151",
};

const smallTitle = {
  marginBottom: "10px",
  color: "#0055A4",
};
