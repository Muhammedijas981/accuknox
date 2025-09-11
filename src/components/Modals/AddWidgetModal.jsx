import React, { useState } from "react";
import useDashboardStore from "../../store/dashboardStore";

const AddWidgetModal = () => {
  const {
    isAddModalOpen,
    closeAddModal,
    selectedCategory,
    addWidget,
    availableWidgets,
    getCategoryById,
  } = useDashboardStore();

  const [selectedWidget, setSelectedWidget] = useState(null);
  const [customName, setCustomName] = useState("");
  const [customText, setCustomText] = useState("");

  if (!isAddModalOpen) return null;

  const category = selectedCategory ? getCategoryById(selectedCategory) : null;
  const categoryName = category ? category.name : "Dashboard";

  const handleAddWidget = () => {
    if (!selectedWidget) {
      alert("Please select a widget");
      return;
    }

    const widgetToAdd = {
      ...selectedWidget,
      name: customName || selectedWidget.name,
      data: {
        ...selectedWidget.data,
        customText:
          customText || selectedWidget.data?.label || "Custom Widget Text",
      },
    };

    if (selectedCategory) {
      addWidget(selectedCategory, widgetToAdd);
    }

    // Reset form
    setSelectedWidget(null);
    setCustomName("");
    setCustomText("");
    closeAddModal();
  };

  const filteredWidgets = selectedCategory
    ? availableWidgets.filter((widget) => widget.category === selectedCategory)
    : availableWidgets;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
        style={{ backgroundColor: "var(--card-background)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Add Widget to {categoryName}
          </h2>
          <button
            onClick={closeAddModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Widget Selection */}
          <div className="mb-6">
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Select Widget Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredWidgets.map((widget) => (
                <div
                  key={widget.id}
                  onClick={() => setSelectedWidget(widget)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedWidget?.id === widget.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className="font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {widget.name}
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {widget.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Configuration */}
          {selectedWidget && (
            <div className="space-y-4">
              <h3
                className="text-lg font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Customize Widget
              </h3>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Widget Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedWidget.name}
                  className="input w-full"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Widget Description/Text
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter custom text for this widget..."
                  rows="3"
                  className="input w-full resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 p-6 border-t"
          style={{ borderColor: "var(--border-color)" }}
        >
          <button onClick={closeAddModal} className="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleAddWidget}
            disabled={!selectedWidget}
            className="btn btn-primary"
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
