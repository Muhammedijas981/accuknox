import React from "react";

const EmptyStateWidget = ({ data }) => {
  const { message = "No data available", icon = "analytics" } = data || {};

  const getIcon = () => {
    switch (icon) {
      case "analytics":
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          </svg>
        );
      case "chart":
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      default:
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div
        className="mb-4 opacity-50"
        style={{ color: "var(--text-disabled)" }}
      >
        {getIcon()}
      </div>
      <p className="text-base" style={{ color: "var(--text-secondary)" }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyStateWidget;
