import React from "react";
import { CircularProgress, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ExecutiveDashboard.css";

const CloudAccountsWidget = () => {
  const data = {
    total: 2,
    connected: 2,
    notConnected: 2,
  };

  const connectedPercentage =
    (data.connected / (data.connected + data.notConnected)) * 100;

  return (
    <div className="executive-widget">
      <div className="widget-header">
        <h3>Cloud Accounts</h3>
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

            {/* Connected data circle */}
            <CircularProgress
              variant="determinate"
              value={connectedPercentage}
              size={120}
              thickness={6}
              sx={{
                color: "#3b82f6",
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
            <span className="legend-dot blue"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Connected ({data.connected})
            </Typography>
          </div>
          <div className="legend-item">
            <span className="legend-dot gray"></span>
            <Typography sx={{ fontSize: "14px", color: "#374151" }}>
              Not Connected ({data.notConnected})
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this at the bottom  
export default CloudAccountsWidget;

