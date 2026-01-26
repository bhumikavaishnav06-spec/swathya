import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/swasthya-logo.png.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItem = (path, label) => (
    <button
      onClick={() => navigate(path)}
      style={{
        ...navBtn,
        borderBottom:
          location.pathname === path ? "3px solid #FF9933" : "none",
      }}
    >
      {label}
    </button>
  );

  return (
    <header style={header}>
      {/* Left: Logo */}
      <div style={left}>
        <img src={logo} alt="Swasthya Logo" style={logoStyle} />
        <span style={title}>Swasthya</span>
      </div>

      {/* Center: Navigation */}
      <nav style={nav}>
        {navItem("/home", "Home")}
        {navItem("/maternal", "Maternal & Child")}
        {navItem("/first-aid", "First Aid")}
        {navItem("/hospitals", "Hospitals")}
        {navItem("/schemes", "Govt Scheme Finder")}
        {navItem("/profile", "Profile")}

      </nav>

      {/* Right: Logout */}
      <button
        style={logoutBtn}
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </header>
  );
}

/* ---------- STYLES ---------- */

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 24px",
  backgroundColor: "#0055A4",
  color: "white",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const logoStyle = {
  width: "40px",
  height: "40px",
};

const title = {
  fontSize: "20px",
  fontWeight: "600",
};

const nav = {
  display: "flex",
  gap: "18px",
};

const navBtn = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "15px",
  cursor: "pointer",
  paddingBottom: "4px",
};

const logoutBtn = {
  backgroundColor: "#D32F2F",
  border: "none",
  color: "white",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
