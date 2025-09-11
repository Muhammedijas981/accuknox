import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
  icon,
  className = "",
  ...props
}) => {
  const baseClasses = "btn";

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-danger",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

// Additional button variants for specific use cases
export const IconButton = ({ icon, onClick, className = "", ...props }) => (
  <button
    className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${className}`}
    onClick={onClick}
    {...props}
  >
    {icon}
  </button>
);

export const FloatingActionButton = ({ icon, onClick, className = "" }) => (
  <button
    className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 ${className}`}
    onClick={onClick}
  >
    {icon}
  </button>
);

export default Button;
