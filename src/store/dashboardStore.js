import { create } from "zustand";
import { persist } from "zustand/middleware";
import defaultWidgetsData from "../data/defaultWidgets.json";
import { v4 as uuidv4 } from "uuid";

// Helper function to generate unique widget IDs
const generateWidgetId = () => `widget-${uuidv4()}`;

const useDashboardStore = create(
  persist(
    (set, get) => ({
      // Dashboard Data
      dashboardTitle: defaultWidgetsData.dashboardTitle,
      categories: defaultWidgetsData.categories,
      availableWidgets: defaultWidgetsData.availableWidgets,

      // UI State
      searchTerm: "",
      isAddModalOpen: false,
      selectedCategory: null,

      // Dashboard Actions
      addWidget: (categoryId, widgetData) => {
        const newWidget = {
          ...widgetData,
          id: generateWidgetId(),
        };

        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: [...category.widgets, newWidget],
                }
              : category
          ),
        }));
      },

      removeWidget: (categoryId, widgetId) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: category.widgets.filter(
                    (widget) => widget.id !== widgetId
                  ),
                }
              : category
          ),
        }));
      },

      updateWidget: (categoryId, widgetId, updatedData) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: category.widgets.map((widget) =>
                    widget.id === widgetId
                      ? { ...widget, ...updatedData }
                      : widget
                  ),
                }
              : category
          ),
        }));
      },

      // Search and Filter
      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      getFilteredWidgets: () => {
        const { categories, searchTerm } = get();

        if (!searchTerm.trim()) return categories;

        const searchLower = searchTerm.toLowerCase();

        return categories
          .map((category) => ({
            ...category,
            widgets: category.widgets.filter(
              (widget) =>
                widget.name.toLowerCase().includes(searchLower) ||
                widget.type.toLowerCase().includes(searchLower)
            ),
          }))
          .filter((category) => category.widgets.length > 0);
      },

      getAvailableWidgetsByCategory: (categoryId) => {
        const { availableWidgets } = get();
        return availableWidgets.filter(
          (widget) => !categoryId || widget.category === categoryId
        );
      },

      // Modal State Management
      openAddModal: (categoryId) => {
        set({
          isAddModalOpen: true,
          selectedCategory: categoryId,
        });
      },

      closeAddModal: () => {
        set({
          isAddModalOpen: false,
          selectedCategory: null,
        });
      },

      // Widget Templates Management
      addWidgetTemplate: (template) => {
        set((state) => ({
          availableWidgets: [
            ...state.availableWidgets,
            {
              ...template,
              id: generateWidgetId(),
            },
          ],
        }));
      },

      // Bulk Operations
      resetToDefault: () => {
        set({
          categories: defaultWidgetsData.categories,
          availableWidgets: defaultWidgetsData.availableWidgets,
          searchTerm: "",
          isAddModalOpen: false,
          selectedCategory: null,
        });
      },

      // Statistics
      getTotalWidgets: () => {
        const { categories } = get();
        return categories.reduce(
          (total, category) => total + category.widgets.length,
          0
        );
      },

      getWidgetsByType: (type) => {
        const { categories } = get();
        const allWidgets = categories.flatMap((category) => category.widgets);
        return allWidgets.filter((widget) => widget.type === type);
      },

      // Category Management
      getCategoryById: (categoryId) => {
        const { categories } = get();
        return categories.find((category) => category.id === categoryId);
      },

      // Data Export/Import
      exportDashboard: () => {
        const { categories, dashboardTitle } = get();
        return JSON.stringify(
          {
            dashboardTitle,
            categories,
            exportDate: new Date().toISOString(),
          },
          null,
          2
        );
      },

      importDashboard: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          if (data.categories && Array.isArray(data.categories)) {
            set({
              categories: data.categories,
              dashboardTitle:
                data.dashboardTitle || defaultWidgetsData.dashboardTitle,
            });
            return { success: true };
          }
          return { success: false, error: "Invalid dashboard format" };
        } catch (error) {
          return { success: false, error: "Failed to parse JSON data" };
        }
      },
    }),
    {
      name: "dashboard-storage",
      // Only persist essential data, not UI state
      partialize: (state) => ({
        categories: state.categories,
        dashboardTitle: state.dashboardTitle,
        availableWidgets: state.availableWidgets,
      }),
    }
  )
);

export default useDashboardStore;
