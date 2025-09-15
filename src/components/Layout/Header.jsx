import React from "react";
import {
  Add,
  Refresh,
  Settings,
  AccessTime,
  KeyboardArrowDown,
} from "@mui/icons-material";

const Header = ({ title, onAddWidget, onRefresh, onSettings }) => {
  return (
    <div className="dashboard-header-section">
      {/* Main Dashboard Title */}
      <div className="main-header">
        <h1 className="main-dashboard-title">{title}</h1>
        <div className="header-actions">
          <button onClick={onAddWidget} className="add-widget-btn">
            <Add sx={{ fontSize: 16 }} />
            Add Widget
          </button>
          <button
            onClick={onRefresh}
            className="icon-button"
            title="Refresh Dashboard"
          >
            <Refresh />
          </button>
          <button
            onClick={onSettings}
            className="icon-button"
            title="Dashboard Settings"
          >
            <Settings />
          </button>
          <div className="time-filter">
            <AccessTime sx={{ fontSize: 14 }} />
            <span>Last 2 days</span>
            <KeyboardArrowDown sx={{ fontSize: 14 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
