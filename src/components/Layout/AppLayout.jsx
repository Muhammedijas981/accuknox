import React from "react";
import SearchBar from "../UI/SearchBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
// import "../../styles/globals.css";

export default function AppLayout({ children }) {
  return (
    <div>
      <nav className="navbar">
        <div className="crumbs">
          <span>Home</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            // style={{ margin: "0 5px" }}
          >
            <path
              d="M9 18l6-6-6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="active">Dashboard V2</span>
        </div>
        <div className="search-container">
          <SearchBar />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px",}}>
          <button className="action-btn">
            <KeyboardArrowDownIcon style={{ fontSize: 16 }} />
          </button>
          <button className="action-btn">
            <NotificationsActiveOutlinedIcon style={{ fontSize: 16 }} />
          </button>
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
}
