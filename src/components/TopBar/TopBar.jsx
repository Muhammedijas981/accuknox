import "./TopBar.css";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TypeSearch from "./Search";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="breadcrumb">
        <span className="breadcrumb-home">Home</span>
        <KeyboardArrowRightOutlinedIcon
          sx={{ color: '#d4d0d0ff', fontSize: 18 }}
        />
        <span>Dashboard V2</span>
      </div>
      <div className="search-container">
        <TypeSearch />
      </div>
      <div className="top-bar-actions">
        <div className="notification-icon">
          <NotificationsActiveOutlinedIcon
            sx={{ color: "grey", fontSize: 18 }}
          />
        </div>
        {/* <div className="profile-icon">
          <PersonOutlinedIcon sx={{ color: "grey", fontSize: 18 }} />
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
