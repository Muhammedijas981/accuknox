import React, { useState } from "react";

const Dropdown = ({
  trigger,
  children,
  position = "bottom-left",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
  };

  return (
    <div className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown content */}
          <div
            className={`absolute z-20 bg-white rounded-md shadow-lg border min-w-48 ${positionClasses[position]}`}
            style={{
              backgroundColor: "var(--card-background)",
              borderColor: "var(--border-color)",
            }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

// Time Filter Dropdown Component
export const TimeFilterDropdown = ({ value, onChange }) => {
  const timeOptions = [
    { label: "Last hour", value: "1h" },
    { label: "Last 6 hours", value: "6h" },
    { label: "Last 24 hours", value: "24h" },
    { label: "Last 2 days", value: "2d" },
    { label: "Last week", value: "7d" },
    { label: "Last month", value: "30d" },
    { label: "Last 3 months", value: "90d" },
  ];

  const selectedOption =
    timeOptions.find((option) => option.value === value) || timeOptions[3];

  const trigger = (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-gray-50 transition-colors"
      style={{ borderColor: "var(--border-color)" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {selectedOption.label}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );

  return (
    <Dropdown trigger={trigger} position="bottom-right">
      <div className="py-2">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
              value === option.value ? "font-medium" : ""
            }`}
            style={{
              color:
                value === option.value
                  ? "var(--primary-blue)"
                  : "var(--text-primary)",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Dropdown>
  );
};

// Settings Dropdown Component
export const SettingsDropdown = ({
  onExport,
  onImport,
  onReset,
  onThemeToggle,
}) => {
  const trigger = (
    <button
      className="p-2 rounded-md hover:bg-gray-100 transition-colors"
      title="Dashboard Settings"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  );

  return (
    <Dropdown trigger={trigger} position="bottom-right">
      <div className="py-2">
        <button
          onClick={onExport}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Dashboard
        </button>

        <button
          onClick={onImport}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17,8 12,3 7,8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Import Dashboard
        </button>

        <div
          className="border-t my-2"
          style={{ borderColor: "var(--border-color)" }}
        ></div>

        <button
          onClick={onThemeToggle}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          Toggle Theme
        </button>

        <div
          className="border-t my-2"
          style={{ borderColor: "var(--border-color)" }}
        ></div>

        <button
          onClick={onReset}
          className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Reset Dashboard
        </button>
      </div>
    </Dropdown>
  );
};

export default Dropdown;
