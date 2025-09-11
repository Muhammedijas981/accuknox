import React from "react";

const DonutChartWidget = ({ data }) => {
  if (!data || !data.chartData) {
    return (
      <div className="text-center text-gray-500 py-8">
        No chart data available
      </div>
    );
  }

  const { total, chartData } = data;
  const radius = 60;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* SVG Donut Chart */}
        <svg width="160" height="160" className="transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
          />

          {chartData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${
              (percentage / 100) * circumference
            } ${circumference}`;
            const strokeDashoffset = -(
              (cumulativePercentage / 100) *
              circumference
            );

            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {total}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Total
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="ml-6 space-y-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartWidget;
