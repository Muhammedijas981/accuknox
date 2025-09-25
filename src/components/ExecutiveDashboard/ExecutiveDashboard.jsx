import React from "react";
import "./ExecutiveDashboard.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudAccountsWidget from "./CloudAccountsWidget";
import RiskAssessmentWidget from "./RiskAssessmentWidget";
import AddWidgetButton from "../Widget/AddWidgetButton";

const ExecutiveDashboard = () => {
  return (
    <div className="executive-dashboard">
      <div className="executive-header">
        <h2>CSPM Executive Dashboard</h2>
      </div>

      <div className="executive-widgets-grid">
        <CloudAccountsWidget />
        <RiskAssessmentWidget />
        <div className="add-widget-slot">
          <AddWidgetButton categoryId="cspm-executive" />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
