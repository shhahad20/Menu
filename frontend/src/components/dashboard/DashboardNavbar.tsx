// import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/dashboard-elements/sidebar.scss";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    const [activeLink, setActiveLink] = useState('Home');

    const handleLinkClick = (link: string) => {
      setActiveLink(link); 
    };
    const links = [
      { name: "Home", path: "" },
      { name: "Menus", path: "menus" },
      { name: "Products", path: "items" },
      { name: "Orders", path: "orders" },
      { name: "Reports", path: "reports" },
      { name: "Marketing", path: "marketing" },
      { name: "Reviews", path: "reviews-suggestions" },
      { name: "Settings", path: "settings" },
      { name: "Support", path: "support" },
    ];


 
  return (
    <div className="dash-navbar">
      <div className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.name}
            to={`/dashboard/${link.path}`} // Use `to` for navigation
            className={activeLink === link.name ? "active" : ""}
            onClick={() => handleLinkClick(link.name)} // Set active on click
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardNavbar;
