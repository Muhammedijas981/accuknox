import React from "react";
import { Add } from "@mui/icons-material";
import useDashboardStore from "../../store/dashboardStore";
import "../../styles/widgets.css";

const AddWidgetCard = ({ categoryId }) => {
  const { openAddModal } = useDashboardStore();

  return (
    <div className="add-widget-card" onClick={() => openAddModal(categoryId)}>
      <Add className="add-widget-icon" sx={{ fontSize: 24 }} />
      <span className="add-widget-text">Add Widget</span>
    </div>
  );
};

export default AddWidgetCard;
