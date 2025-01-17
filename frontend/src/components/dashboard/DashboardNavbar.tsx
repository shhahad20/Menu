// import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/dashboard-elements/sidebar.scss";

const DashboardNavbar = () => {
    const [activeLink, setActiveLink] = useState('Home'); // Default active link

    const handleLinkClick = (link: string) => {
      setActiveLink(link); // Update the active link
    };

  return (
    <div className="dash-navbar">
      <div className="navbar-links">
      {['Home', 'Menus', 'Products', 'Orders', 'Reports', 'Marketing', 'Reviews', 'Settings', 'Support'].map(
          (link) => (
            <a
              key={link}
              href="#"
              className={activeLink === link ? 'active' : ''}
              onClick={() => handleLinkClick(link)} // Set active on click
            >
              {link}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
