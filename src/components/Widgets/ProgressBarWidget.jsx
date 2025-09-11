import React from "react";

const ProgressBarWidget = ({ data }) => {
  if (!data || !data.breakdown) {
    return (
      <div className="text-center text-gray-500 py-8">
        No progress data available
      </div>
    );
  }

  const { total, label, breakdown } = data;

  return (
    <div className="space-y-4">
      {/* Total Count */}
      <div className="text-center">
        <div
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {total}
        </div>
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {label}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <div className="h-full flex">
            {breakdown.map((item, index) => {
              const percentage = (item.value / total) * 100;
              return (
                <div
                  key={index}
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-medium truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {item.label} ({item.value})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarWidget;
