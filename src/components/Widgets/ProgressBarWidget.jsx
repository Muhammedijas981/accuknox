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
    <div className="space-y-2">
      {/* Total and Label */}
      <div className="flex items-center gap-1">
        <span className="font-medium">{total}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div
          className="w-full h-4 overflow-hidden"
          style={{ backgroundColor: "#E5E7EB" }}
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
      <div className="space-y-1">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0 flex items-center">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm text-gray-600 ml-1">({item.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarWidget;
