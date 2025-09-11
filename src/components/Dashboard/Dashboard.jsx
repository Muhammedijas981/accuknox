import React from "react";
import useDashboardStore from "../../store/dashboardStore";
import SearchBar from "../UI/SearchBar";
import CategorySection from "./CategorySection";
import AddWidgetModal from "../Modals/AddWidgetModal";

const Dashboard = () => {
  const {
    dashboardTitle,
    getFilteredWidgets,
    searchTerm,
    isAddModalOpen,
    openAddModal,
  } = useDashboardStore();

  const filteredCategories = getFilteredWidgets();

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Title and Actions */}
        <div className="flex items-center justify-between">
          <h1
            className="text-xxxl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {dashboardTitle}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openAddModal(null)}
              className="btn btn-primary flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Widget
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
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
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
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
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
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Last 2 days
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
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {filteredCategories.length === 0 && searchTerm ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3
              className="text-xl font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              No widgets found
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Try adjusting your search term to find what you're looking for.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))
        )}
      </div>

      {/* Add Widget Modal */}
      {isAddModalOpen && <AddWidgetModal />}
    </div>
  );
};

export default Dashboard;
