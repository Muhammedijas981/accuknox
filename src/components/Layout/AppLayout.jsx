import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Top Navigation Bar */}
      <nav
        className="bg-white border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Breadcrumb */}
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>Home</span>
              <span>&gt;</span>
              <span style={{ color: "var(--text-primary)" }}>Dashboard V2</span>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">{children}</main>
    </div>
  );
};

export default AppLayout;
