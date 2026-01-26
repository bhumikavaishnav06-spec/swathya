export default function GovHeader() {
  return (
    <header
      style={{
        background: "#0055A4",
        color: "white",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Ministry Name */}
      <div style={{ fontSize: "16px", fontWeight: 600 }}>
        Ministry of Health & Family Welfare
        <div style={{ fontSize: "13px", opacity: 0.9 }}>
          Government of India
        </div>
      </div>

      {/* Center: App Name */}
      <div style={{ fontSize: "22px", fontWeight: 700 }}>
        Swasthya
      </div>

      {/* Right: Language Toggle */}
      <div style={{ fontSize: "14px", cursor: "pointer" }}>
        EN | हिंदी
      </div>
    </header>
  );
}
