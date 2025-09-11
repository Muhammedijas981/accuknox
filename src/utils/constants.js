// Constants for the dashboard application

// Widget Types
export const WIDGET_TYPES = {
  DONUT_CHART: "donut-chart",
  PROGRESS_BAR: "progress-bar",
  EMPTY_STATE: "empty-state",
  METRIC: "metric",
  LINE_CHART: "line-chart",
  BAR_CHART: "bar-chart",
  TABLE: "table",
};

// Category IDs
export const CATEGORY_IDS = {
  CSPM_EXECUTIVE: "cspm-executive",
  CWPP_DASHBOARD: "cwpp-dashboard",
  REGISTRY_SCAN: "registry-scan",
};

// Status Types
export const STATUS_TYPES = {
  HEALTHY: "healthy",
  WARNING: "warning",
  DANGER: "danger",
  NORMAL: "normal",
  CRITICAL: "critical",
};

// Color Palette
export const COLORS = {
  PRIMARY_BLUE: "#4A90E2",
  DANGER_RED: "#D32F2F",
  WARNING_ORANGE: "#FF9800",
  SUCCESS_GREEN: "#4CAF50",
  INFO_BLUE: "#2196F3",
  GRAY: "#9E9E9E",
  LIGHT_GRAY: "#E0E0E0",
};

// Time Filter Options
export const TIME_FILTERS = {
  HOUR: { label: "Last hour", value: "1h" },
  SIX_HOURS: { label: "Last 6 hours", value: "6h" },
  TWENTY_FOUR_HOURS: { label: "Last 24 hours", value: "24h" },
  TWO_DAYS: { label: "Last 2 days", value: "2d" },
  WEEK: { label: "Last week", value: "7d" },
  MONTH: { label: "Last month", value: "30d" },
  THREE_MONTHS: { label: "Last 3 months", value: "90d" },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  DASHBOARD_DATA: "dashboard-storage",
  USER_PREFERENCES: "user-preferences",
  THEME: "dashboard-theme",
};

// Modal Sizes
export const MODAL_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  FULL: "full",
};

// Button Variants
export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GHOST: "ghost",
  DANGER: "danger",
};

// Grid Layout Settings
export const GRID_SETTINGS = {
  COLUMNS: 12,
  ROW_HEIGHT: 60,
  MARGIN: [16, 16],
  CONTAINER_PADDING: [16, 16],
};

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

// Default Widget Dimensions
export const DEFAULT_WIDGET_SIZE = {
  width: 6,
  height: 4,
  minWidth: 3,
  minHeight: 2,
};

// Error Messages
export const ERROR_MESSAGES = {
  WIDGET_NOT_FOUND: "Widget not found",
  CATEGORY_NOT_FOUND: "Category not found",
  INVALID_DATA: "Invalid data format",
  SAVE_FAILED: "Failed to save changes",
  LOAD_FAILED: "Failed to load data",
  NETWORK_ERROR: "Network error occurred",
  PERMISSION_DENIED: "Permission denied",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  WIDGET_ADDED: "Widget added successfully",
  WIDGET_REMOVED: "Widget removed successfully",
  WIDGET_UPDATED: "Widget updated successfully",
  DASHBOARD_SAVED: "Dashboard saved successfully",
  DASHBOARD_LOADED: "Dashboard loaded successfully",
  SETTINGS_SAVED: "Settings saved successfully",
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  DASHBOARD: "/api/dashboard",
  WIDGETS: "/api/widgets",
  CATEGORIES: "/api/categories",
  EXPORT: "/api/export",
  IMPORT: "/api/import",
};

// Chart Configuration
export const CHART_CONFIG = {
  DONUT: {
    RADIUS: 60,
    STROKE_WIDTH: 15,
    CENTER_RADIUS: 45,
  },
  COLORS: [
    "#4A90E2",
    "#D32F2F",
    "#FF9800",
    "#4CAF50",
    "#9C27B0",
    "#FF5722",
    "#607D8B",
    "#795548",
  ],
};

// Feature Flags (for conditional features)
export const FEATURES = {
  DRAG_AND_DROP: true,
  DARK_MODE: true,
  EXPORT_IMPORT: true,
  REAL_TIME_UPDATES: false,
  CUSTOM_THEMES: false,
  ADVANCED_CHARTS: false,
};

export default {
  WIDGET_TYPES,
  CATEGORY_IDS,
  STATUS_TYPES,
  COLORS,
  TIME_FILTERS,
  STORAGE_KEYS,
  MODAL_SIZES,
  BUTTON_VARIANTS,
  GRID_SETTINGS,
  ANIMATIONS,
  BREAKPOINTS,
  DEFAULT_WIDGET_SIZE,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  API_ENDPOINTS,
  CHART_CONFIG,
  FEATURES,
};
