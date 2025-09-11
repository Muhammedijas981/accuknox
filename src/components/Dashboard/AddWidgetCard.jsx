import React from "react";
import useDashboardStore from "../../store/dashboardStore";

const AddWidgetCard = ({ categoryId }) => {
  const { openAddModal } = useDashboardStore();

  return (
    <div className="add-widget-card" onClick={() => openAddModal(categoryId)}>
      <div className="add-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-disabled)" }}
      >
        Add Widget
      </span>
    </div>
  );
};

export default AddWidgetCard;
