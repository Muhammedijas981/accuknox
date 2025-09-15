import React from "react";
import { Close } from "@mui/icons-material";
import useDashboardStore from "../../store/dashboardStore";
import DonutChartWidget from "./DonutChartWidget";
import ProgressBarWidget from "./ProgressBarWidget";
import EmptyStateWidget from "./EmptyStateWidget";
import MetricWidget from "./MetricWidget";
import "../../styles/widgets.css";

const BaseWidget = ({ widget, categoryId }) => {
  const { removeWidget } = useDashboardStore();

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this widget?")) {
      removeWidget(categoryId, widget.id);
    }
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "donut-chart":
        return <DonutChartWidget data={widget.data} />;
      case "progress-bar":
        return <ProgressBarWidget data={widget.data} />;
      case "empty-state":
        return <EmptyStateWidget data={widget.data} />;
      case "metric":
        return <MetricWidget data={widget.data} />;
      default:
        return (
          <div className="empty-state-container">
            <span className="empty-state-text">
              Unknown widget type: {widget.type}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{widget.name}</h3>
        <button
          onClick={handleRemove}
          className="widget-remove-btn"
          title="Remove widget"
        >
          <Close />
        </button>
      </div>
      <div className="card-content">{renderWidgetContent()}</div>
    </div>
  );
};

export default BaseWidget;
