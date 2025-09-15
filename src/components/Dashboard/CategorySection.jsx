import React from "react";
import BaseWidget from "../Widgets/BaseWidget";
import AddWidgetCard from "./AddWidgetCard";
import "../../styles/category-section.css";

const CategorySection = ({ category }) => {
  return (
    <div className="category-section">
      <h2 className="category-title">{category.name}</h2>
      <div className="category-widget-grid">
        {category.widgets.map((widget) => (
          <BaseWidget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}
        <AddWidgetCard categoryId={category.id} />
      </div>
    </div>
  );
};

export default CategorySection;
