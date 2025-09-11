import React from "react";

const MetricWidget = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">
        No metric data available
      </div>
    );
  }

  const { value, label, status, color } = data;

  const getStatusColor = () => {
    if (color) return color;

    switch (status) {
      case "healthy":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "danger":
        return "#D32F2F";
      case "normal":
      default:
        return "#4A90E2";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "healthy":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M9 11l3 3L22 4" />
          </svg>
        );
      case "warning":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12" y2="17" />
          </svg>
        );
      case "danger":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="8" />
          </svg>
        );
    }
  };

  return (
    <div className="text-center py-6">
      {/* Main Metric */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="text-4xl font-bold" style={{ color: getStatusColor() }}>
          {value}
        </div>
        <div style={{ color: getStatusColor() }}>{getStatusIcon()}</div>
      </div>

      {/* Label */}
      <div
        className="text-base font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </div>

      {/* Status Badge */}
      {status && (
        <div
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mt-3"
          style={{
            backgroundColor: `${getStatusColor()}20`,
            color: getStatusColor(),
          }}
        >
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )}
    </div>
  );
};

export default MetricWidget;
