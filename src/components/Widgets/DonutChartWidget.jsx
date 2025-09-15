import React from "react";

const DonutChartWidget = ({ data }) => {
  if (!data || !data.chartData) {
    return (
      <div className="empty-state-container">
        <span className="empty-state-text">No chart data available</span>
      </div>
    );
  }

  const { total, chartData } = data;
  const radius = 60;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;

  return (
    <div className="donut-chart-container">
      <div className="donut-chart-wrapper">
        <svg width="140" height="140" className="transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#F3F4F6"
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
                cx="70"
                cy="70"
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

        <div className="donut-center-text">
          <div className="donut-center-number">{total}</div>
          <div className="donut-center-label">Total</div>
        </div>
      </div>

      <div className="donut-legend">
        {chartData.map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="legend-text">
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartWidget;
