import React from "react";
import BaseWidget from "../Widgets/BaseWidget";
import AddWidgetCard from "./AddWidgetCard";

const WidgetGrid = ({ widgets = [], categoryId, showAddCard = true }) => {
  return (
    <div className="widget-grid">
      {/* Render existing widgets */}
      {widgets.map((widget) => (
        <BaseWidget key={widget.id} widget={widget} categoryId={categoryId} />
      ))}

      {/* Add Widget Card - only show if enabled */}
      {showAddCard && <AddWidgetCard categoryId={categoryId} />}
    </div>
  );
};

export default WidgetGrid;
