import React from "react";
import useDashboardStore from "../../store/dashboardStore";
import DonutChartWidget from "./DonutChartWidget";
import ProgressBarWidget from "./ProgressBarWidget";
import EmptyStateWidget from "./EmptyStateWidget";
import MetricWidget from "./MetricWidget";

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
          <div
            className="p-4 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Unknown widget type: {widget.type}
          </div>
        );
    }
  };

  return (
    <div className="card widget-card">
      {/* Widget Header */}
      <div className="card-header">
        <h3
          className="font-medium text-base"
          style={{ color: "var(--text-primary)" }}
        >
          {widget.name}
        </h3>
        <button
          onClick={handleRemove}
          className="p-1 rounded hover:bg-red-50 transition-colors group"
          title="Remove widget"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400 group-hover:text-red-500 transition-colors"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Widget Content */}
      <div className="card-content">{renderWidgetContent()}</div>
    </div>
  );
};

export default BaseWidget;
