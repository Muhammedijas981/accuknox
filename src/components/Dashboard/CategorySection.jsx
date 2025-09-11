import React from "react";
import BaseWidget from "../Widgets/BaseWidget";
import AddWidgetCard from "./AddWidgetCard";

const CategorySection = ({ category }) => {
  return (
    <div className="category-section mb-8">
      {/* Category Header */}
      <h2
        className="text-xl font-medium mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        {category.name}
      </h2>

      {/* Widget Grid */}
      <div className="widget-grid">
        {/* Existing Widgets */}
        {category.widgets.map((widget) => (
          <BaseWidget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}

        {/* Add Widget Card */}
        <AddWidgetCard categoryId={category.id} />
      </div>
    </div>
  );
};

export default CategorySection;
