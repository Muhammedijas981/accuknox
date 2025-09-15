import React from "react";
import { CheckCircle } from "@mui/icons-material";

const MetricWidget = ({ data }) => {
  if (!data) {
    return (
      <div className="empty-state-container">
        <span className="empty-state-text">No metric data available</span>
      </div>
    );
  }

  const { value, label, status } = data;

  return (
    <div className="metric-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="metric-value">{value}</span>
        <CheckCircle className="metric-icon" sx={{ fontSize: 24 }} />
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-status">Status: {status}</div>
    </div>
  );
};

export default MetricWidget;
