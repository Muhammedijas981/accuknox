import React from "react";
import useDashboardStore from "../../store/dashboardStore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useDashboardStore();
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        className="search-input"
        placeholder="Search anything..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#E7F3FF",
          border: "1px solid #B3D9FF",
          borderRadius: "5px",
          paddingLeft: "30px",
          paddingRight: "15px",
          fontSize: "9px",
          fontWeight: "600",
          color: "#cfd1d3ff",
          outline: "none",
        }}
      />
      <div
        className="search-icon"
        style={{
          position: "absolute",
          left: "15px",
          top: "57%",
          transform: "translateY(-50%)",
          color: "#9CA3AF",
        }}
      >
        <SearchOutlinedIcon style={{ fontSize: 16 }} />
      </div>
    </div>
  );
};

export default SearchBar;
