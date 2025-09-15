import React from "react";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  AccessTime as TimeIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import useDashboardStore from "../../store/dashboardStore";
import "../../styles/dashboard-header.css";

const DashboardHeader = () => {
  const { dashboardTitle, openAddModal } = useDashboardStore();

  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">{dashboardTitle}</h1>

      <div className="dashboard-actions">
        <button className="add-widget-btn" onClick={() => openAddModal(null)}>
          <AddIcon sx={{ fontSize: 16 }} />
          Add Widget
        </button>

        <button className="icon-button">
          <RefreshIcon />
        </button>

        <button className="icon-button">
          <SettingsIcon />
        </button>

        <button className="time-filter">
          <TimeIcon />
          Last 2 days
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
