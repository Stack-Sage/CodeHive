import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "14px",
  color: "#000",
  fontWeight: "600",
  fontSize: "0.95rem",
  padding: "0.75rem 1.25rem",
  backdropFilter: "blur(12px)",

  zIndex:"9999",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow:
    "0 8px 24px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.2)",
  backgroundImage:
    "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.6))",
};

// ✅ Success → frosted glass with cool glow
export const showSuccess = (message) => {
  toast.success(message, {
    id: "success-toast", // prevent duplicates
    duration: 3000,
    style: {
      ...baseStyle,
      backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,249,255,0.7))",
      boxShadow:
        "0 8px 24px rgba(99,102,241,0.3), inset 0 1px 3px rgba(255,255,255,0.3)",
    },
    iconTheme: {
      primary: "#6366f1",
      secondary: "#fff",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    id: "error-toast", // prevent duplicates
    duration: 3000,
    style: {
      ...baseStyle,
      backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(254,226,226,0.7))",
      boxShadow:
        "0 8px 24px rgba(244,63,94,0.35), inset 0 1px 3px rgba(255,255,255,0.3)",
    },
    iconTheme: {
      primary: "#f43f5e",
      secondary: "#fff",
    },
  });
};

// ℹ️ Info → frosted glass with violet/blue glow
export const showInfo = (message) => {
  toast(message, {
    id: "info-toast", // prevent duplicates
    duration: 3000,
    style: {
      ...baseStyle,
      backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(224,231,255,0.7))",
      boxShadow:
        "0 8px 24px rgba(139,92,246,0.35), inset 0 1px 3px rgba(255,255,255,0.3)",
    },
    iconTheme: {
      primary: "#8b5cf6",
      secondary: "#fff",
    },
  });
};