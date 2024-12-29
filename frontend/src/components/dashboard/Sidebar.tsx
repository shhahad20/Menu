// Dashboard.tsx
import { useState } from "react";
import "../../styles/dashboard-elements/sidebar.scss";
import { Link } from "react-router-dom"; // Import React Router

const Sidebar = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools1 = [
    { icon: "/home.svg", name: "Home", path: "" },
    { icon: "/items.svg", name: "Products", path: "items" },
    { icon: "/orders.svg", name: "Orders", path: "orders" },
    { icon: "/chart.svg", name: "Reports", path: "reports" },
    { icon: "/report.svg", name: "Marketing", path: "marketing" },
    {
      icon: "/reviews.svg",
      name: "Reviews",
      path: "reviews-suggestions",
    },
  ];
  const tools2 = [
    { icon: "/upgrade.svg", name: "Upgrade", path: "upgrade" },
    { icon: "/setting.svg", name: "Menus", path: "setting" },
    { icon: "/notification.svg", name: "Notifications", path: "notifications" },
    { icon: "/wallet.svg", name: "Wallet & Bills", path: "wallet" },
  ];
  const tools3 = [
    { icon: "/themes.svg", name: "Menu Themes", path: "themes" },
    { icon: "/design-r.svg", name: "Design Request", path: "request-design" },
  ];
  const tools4 = [
    { icon: "/reviews.svg", name: "Feedback", path: "suggestions" },
    { icon: "/contact-us.svg", name: "Contact", path: "contact-us" },
  ];

  return (
    <div className="sidebar-container">
      <div className="right-panel">
        <ul className="tools-list">
          {tools1.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
                <span className="tool-name">{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">Settings</h2>
          {tools2.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
                <span className="tool-name">{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">Menu</h2>
          {tools3.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
                <span className="tool-name">{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">Support</h2>
          {tools4.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
                <span className="tool-name">{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
