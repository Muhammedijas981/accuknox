import React from "react";
import { CircularProgress, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ExecutiveDashboard.css";

const RiskAssessmentWidget = () => {
  const data = {
    total: 9659,
    failed: 1689,
    warning: 681,
    notAvailable: 36,
    passed: 7253,
  };

  const total = data.failed + data.warning + data.notAvailable + data.passed;

  // Calculate percentages for each segment
  const failedPercentage = (data.failed / total) * 100;
  const warningPercentage = (data.warning / total) * 100;
  const notAvailablePercentage = (data.notAvailable / total) * 100;
  const passedPercentage = (data.passed / total) * 100;

  return (
    <div className="executive-widget">
      <div className="widget-header">
        <h3>Cloud Account Risk Assessment</h3>
        <IconButton
          size="small"
          sx={{
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#dc2626",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="widget-content">
        <div className="chart-section">
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            {/* Background circle */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={120}
              thickness={6}
              sx={{
                color: "#f3f4f6",
                position: "absolute",
              }}
            />

            {/* Passed segment (largest) */}
            <CircularProgress
              variant="determinate"
              value={passedPercentage}
              size={120}
              thickness={6}
              sx={{
                color: "#10b981",
                position: "absolute",
                transform: "rotate(0deg)",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />

            {/* Failed segment */}
            <CircularProgress
              variant="determinate"
              value={failedPercentage}
              size={120}
              thickness={6}
              sx={{
                color: "#dc2626",
                position: "absolute",
                transform: "rotate(90deg)",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />

            {/* Warning segment */}
            <CircularProgress
              variant="determinate"
              value={warningPercentage}
              size={120}
              thickness={6}
              sx={{
                color: "#f59e0b",
                position: "absolute",
                transform: "rotate(180deg)",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />

            {/* Center content */}
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  lineHeight: 1,
                }}
              >
                {data.total}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "2px",
                }}
              >
                Total
              </Typography>
            </Box>
          </Box>
        </div>

        <div className="legend-section">
          <div className="legend-item">
            <span className="legend-dot red"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Failed ({data.failed})
            </Typography>
          </div>
          <div className="legend-item">
            <span className="legend-dot yellow"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Warning ({data.warning})
            </Typography>
          </div>
          <div className="legend-item">
            <span className="legend-dot gray"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Not available ({data.notAvailable})
            </Typography>
          </div>
          <div className="legend-item">
            <span className="legend-dot green"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Passed ({data.passed})
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentWidget;
