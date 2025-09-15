import React, { useState } from 'react';
import './DashboardHeader.css';
import { 
  Button, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl,
  Menu,
  MenuItem as MenuItemOption
} from '@mui/material';
import {
  Add as AddIcon,
  Sync as SyncIcon, // ✅ Fixed capitalization
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';

const DashboardHeader = () => {
  const [timeFilter, setTimeFilter] = useState('Last 2 days');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleAddWidget = () => {
    console.log('Add Widget clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <h1>CNAPP Dashboard</h1>
      </div>

      <div className="dashboard-actions">
        {/* Add Widget Button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon sx={{ fontSize: "16px" }} />}
          onClick={handleAddWidget}
          className="add-widget-btn"
          sx={{
            textTransform: "none",
            color: "#6b7280",
            borderColor: "#d1d5db",
            backgroundColor: "white",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Add Widget
        </Button>

        {/* Refresh Button */}
        <IconButton
          onClick={handleRefresh}
          className="refresh-btn"
          sx={{
            backgroundColor: "white",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f9fafb",
              borderColor: "#9ca3af",
            },
          }}
        >
          <SyncIcon sx={{ fontSize: "18px" }} />
        </IconButton>

        <IconButton
          onClick={handleMenuClick}
          className="menu-btn"
          sx={{
            backgroundColor: "white",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f9fafb",
              borderColor: "#9ca3af",
            },
          }}
        >
          <MoreVertIcon sx={{ fontSize: "18px" }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItemOption onClick={handleMenuClose}>Settings</MenuItemOption>
          <MenuItemOption onClick={handleMenuClose}>Export</MenuItemOption>
          <MenuItemOption onClick={handleMenuClose}>Help</MenuItemOption>
        </Menu>

        <div className="time-filter-container">
          <FormControl className="time-filter">
            <Select
              value={timeFilter}
              onChange={handleTimeFilterChange}
              displayEmpty
              className="time-select"
              IconComponent={ArrowDownIcon}
              sx={{
                backgroundColor: "white",
                border: "1px solid #3b82f6",
                borderRadius: "6px",
                color: "#3b82f6",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: "500",
                },
              }}
              renderValue={(selected) => (
                <div className="time-filter-display">
                  <ScheduleIcon sx={{ fontSize: "14px", color: "#3b82f6" }} />
                  <span>{selected}</span>
                </div>
              )}
            >
              <MenuItem value="Last 2 days">Last 2 days</MenuItem>
              <MenuItem value="Last 7 days">Last 7 days</MenuItem>
              <MenuItem value="Last 30 days">Last 30 days</MenuItem>
              <MenuItem value="Last 90 days">Last 90 days</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
