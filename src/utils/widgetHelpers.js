import { v4 as uuidv4 } from "uuid";
import { WIDGET_TYPES, STATUS_TYPES, COLORS } from "./constants";

// Generate unique IDs for widgets
export const generateWidgetId = () => `widget-${uuidv4()}`;

// Validate widget data structure
export const validateWidget = (widget) => {
  const requiredFields = ["id", "name", "type"];

  for (const field of requiredFields) {
    if (!widget[field]) {
      return { isValid: false, error: `Missing required field: ${field}` };
    }
  }

  if (!Object.values(WIDGET_TYPES).includes(widget.type)) {
    return { isValid: false, error: `Invalid widget type: ${widget.type}` };
  }

  return { isValid: true };
};

// Format widget data for display
export const formatWidgetData = (widget) => {
  if (!widget || !widget.data) return widget;

  const { data } = widget;

  switch (widget.type) {
    case WIDGET_TYPES.METRIC:
      return {
        ...widget,
        data: {
          ...data,
          formattedValue: formatNumber(data.value),
          statusColor: getStatusColor(data.status),
        },
      };

    case WIDGET_TYPES.DONUT_CHART:
      return {
        ...widget,
        data: {
          ...data,
          chartData: data.chartData?.map((item) => ({
            ...item,
            percentage: ((item.value / data.total) * 100).toFixed(1),
          })),
        },
      };

    case WIDGET_TYPES.PROGRESS_BAR:
      return {
        ...widget,
        data: {
          ...data,
          breakdown: data.breakdown?.map((item) => ({
            ...item,
            percentage: ((item.value / data.total) * 100).toFixed(1),
          })),
        },
      };

    default:
      return widget;
  }
};

// Format numbers for display
export const formatNumber = (value) => {
  if (typeof value !== "number") return value;

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
};

// Get color based on status
export const getStatusColor = (status) => {
  switch (status) {
    case STATUS_TYPES.HEALTHY:
      return COLORS.SUCCESS_GREEN;
    case STATUS_TYPES.WARNING:
      return COLORS.WARNING_ORANGE;
    case STATUS_TYPES.DANGER:
    case STATUS_TYPES.CRITICAL:
      return COLORS.DANGER_RED;
    case STATUS_TYPES.NORMAL:
    default:
      return COLORS.PRIMARY_BLUE;
  }
};

// Calculate widget grid position
export const calculateGridPosition = (widgets, newWidget) => {
  if (!widgets || widgets.length === 0) {
    return { x: 0, y: 0, w: 6, h: 4 };
  }

  // Find the next available position
  const occupiedPositions = widgets.map(
    (w) => w.position || { x: 0, y: 0, w: 6, h: 4 }
  );
  const gridWidth = 12;

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x <= gridWidth - 6; x += 6) {
      const position = { x, y, w: 6, h: 4 };

      if (!isPositionOccupied(position, occupiedPositions)) {
        return position;
      }
    }
  }

  // Fallback to bottom
  const maxY = Math.max(...occupiedPositions.map((p) => p.y + p.h));
  return { x: 0, y: maxY, w: 6, h: 4 };
};

// Check if a position is occupied
const isPositionOccupied = (position, occupiedPositions) => {
  return occupiedPositions.some(
    (occupied) =>
      position.x < occupied.x + occupied.w &&
      position.x + position.w > occupied.x &&
      position.y < occupied.y + occupied.h &&
      position.y + position.h > occupied.y
  );
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Filter widgets by search term
export const filterWidgetsBySearch = (widgets, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) return widgets;

  const search = searchTerm.toLowerCase().trim();

  return widgets.filter(
    (widget) =>
      widget.name.toLowerCase().includes(search) ||
      widget.type.toLowerCase().includes(search) ||
      (widget.data?.label && widget.data.label.toLowerCase().includes(search))
  );
};

// Sort widgets by different criteria
export const sortWidgets = (widgets, sortBy = "name", sortOrder = "asc") => {
  const sorted = [...widgets].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "type":
        aValue = a.type;
        bValue = b.type;
        break;
      case "created":
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
};

// Export dashboard data
export const exportDashboardData = (categories, title = "Dashboard") => {
  const exportData = {
    title,
    categories,
    exportedAt: new Date().toISOString(),
    version: "1.0",
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  // Create download link
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `dashboard-export-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

// Import dashboard data
export const importDashboardData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        // Validate imported data structure
        if (!data.categories || !Array.isArray(data.categories)) {
          reject(new Error("Invalid dashboard format: missing categories"));
          return;
        }

        // Validate each category
        for (const category of data.categories) {
          if (
            !category.id ||
            !category.name ||
            !Array.isArray(category.widgets)
          ) {
            reject(new Error("Invalid category format"));
            return;
          }

          // Validate widgets in category
          for (const widget of category.widgets) {
            const validation = validateWidget(widget);
            if (!validation.isValid) {
              reject(new Error(`Invalid widget: ${validation.error}`));
              return;
            }
          }
        }

        resolve(data);
      } catch (error) {
        reject(new Error("Failed to parse JSON file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

// Generate sample widget data
export const generateSampleWidget = (type, categoryId) => {
  const baseWidget = {
    id: generateWidgetId(),
    name: `Sample ${type.replace("-", " ")} Widget`,
    type,
    category: categoryId,
    createdAt: new Date().toISOString(),
  };

  switch (type) {
    case WIDGET_TYPES.METRIC:
      return {
        ...baseWidget,
        data: {
          value: Math.floor(Math.random() * 100),
          label: "Sample Metric",
          status: STATUS_TYPES.NORMAL,
          color: COLORS.PRIMARY_BLUE,
        },
      };

    case WIDGET_TYPES.DONUT_CHART:
      return {
        ...baseWidget,
        data: {
          total: 100,
          chartData: [
            { label: "Active", value: 70, color: COLORS.SUCCESS_GREEN },
            { label: "Inactive", value: 30, color: COLORS.LIGHT_GRAY },
          ],
        },
      };

    case WIDGET_TYPES.PROGRESS_BAR:
      return {
        ...baseWidget,
        data: {
          total: 100,
          label: "Progress",
          breakdown: [
            { label: "Completed", value: 75, color: COLORS.SUCCESS_GREEN },
            { label: "Remaining", value: 25, color: COLORS.LIGHT_GRAY },
          ],
        },
      };

    case WIDGET_TYPES.EMPTY_STATE:
    default:
      return {
        ...baseWidget,
        data: {
          message: "No data available",
          icon: "analytics",
        },
      };
  }
};

// Utility to truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
