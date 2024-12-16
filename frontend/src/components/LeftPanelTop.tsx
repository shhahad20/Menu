import { useState } from "react";
// import { FaUserCircle, FaMoon, FaSearch } from "react-icons/fa";
// import { FiLogOut, FiSettings } from "react-icons/fi";
import "../styles/leftPanelTop.scss";

export const LeftPanelTop = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
//   const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="left-panel-section">
        <div className="left-panel-wrapper">
      <div className="user-icon" onClick={toggleMenu}>
        {/* <div className="user"></div> */}
        <div className="user-container">
          <img src="/down-arrow.svg" alt="down-arrow" width={10} height={10} />
          <p>Shahad</p>
          <img className="user-img" src="/user-img.svg" alt="user-img" />
        </div>
        {isMenuOpen && (
          <div className="slide-menu">
            <div className="menu-item">الملف الشخصي</div>
            <div className="menu-item">
              <p className="logout"> تسجيل الخروج</p>
              <img className="logout-icon" src="/logout-red.svg" alt="" width={12} height={12} />
            </div>
          </div>
        )}
        
      </div>
      {/* <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <img
          src="/dark_1.svg"
          alt="dark"
          className={`icon ${darkMode ? "active" : ""}`}
          width={13}
          height={13}
        />
      </div> */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        {/* <img src="/search-bar.svg" alt="search-icon" className="search-bar-icon" width={15} height={15}/> */}

      </div>

      </div>
    </div>
  );
};
