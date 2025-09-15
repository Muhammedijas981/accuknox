import React from "react";
import useDashboardStore from "../../store/dashboardStore";
import DashboardHeader from "./DashboardHeader";
import CategorySection from "./CategorySection";
import AddWidgetModal from "../Modals/AddWidgetModal";

const Dashboard = () => {
  const { getFilteredWidgets, isAddModalOpen } = useDashboardStore();
  const filteredCategories = getFilteredWidgets();

  return (
    <div className="dashboard">
      <DashboardHeader />

      <div className="dashboard-content">
        {filteredCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>

      {isAddModalOpen && <AddWidgetModal />}
    </div>
  );
};

export default Dashboard;
