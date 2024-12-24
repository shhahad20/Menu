// Dashboard.tsx
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../src/redux/store";
import { fetchAllMenuTemplates } from "../../src/redux/menu/menuSlice";
// import MenuList from "./MenuList";
// import EditMenuItemForm from "./EditMenuItemForm";
import "../styles/dashboard.scss";
import { LeftPanelTop } from "./LeftPanelTop";
import Breadcrumb from "./Breadcrumb";
import { Link, useNavigate } from "react-router-dom"; // Import React Router

// Define a prop type to accept leftPanelContent as ReactNode
interface DashboardProps {
  leftPanelContent?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ leftPanelContent }) => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { name: string; path: string }[]
  >([{ name: "الرئيسية", path: "/" }]);
  const navigate = useNavigate();

  // Replace these with actual user data from your state or context
  const user = {
    name: "Shahad",
    subscription: "Premium",
    imageUrl: "/me.jpg", // Placeholder for user image URL
  };
  const tools1 = [
    { icon: "/home.svg", name: "الرئيسية", path: "home" },
    { icon: "/items.svg", name: "المنتجات", path: "items" },
    { icon: "/orders.svg", name: "الطلبات", path: "orders" },
    { icon: "/chart.svg", name: "التقارير", path: "reports" },
    { icon: "/report.svg", name: "التسويق", path: "marketing" },
    {
      icon: "/reviews.svg",
      name: "التقييمات والاقتراحات",
      path: "reviews-suggestions",
    },
  ];
  const tools2 = [
    { icon: "/upgrade.svg", name: "ترقية الباقة", path: "upgrade" },
    { icon: "/setting.svg", name: "إعدادات المينو", path: "setting" },
    { icon: "/notification.svg", name: "التنبيهات", path: "notifications" },
    { icon: "/wallet.svg", name: "المحفظة والفواتير", path: "wallet" },
  ];
  const tools3 = [
    { icon: "/themes.svg", name: "ثيمات المينو", path: "themes" },
    { icon: "/design-r.svg", name: "طلب تصميم خاص", path: "request-design" },
  ];
  const tools4 = [
    { icon: "/reviews.svg", name: "اقتراحاتكم", path: "suggestions" },
    { icon: "/contact-us.svg", name: "اتصل بنا", path: "contact-us" },
  ];
  // const handleToolClick = (tool: { name: string; path: string }) => {
  //   setSelectedTool(tool.name);
  //   setBreadcrumbItems([
  //     { name: tool.name, path: `/dashboard/${tool.path}` },
  //     { name: "الرئيسية", path: "/" },
  //   ]);
  //   if (tool.path) {
  //     navigate(`/dashboard/${tool.path}`);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchAllMenuTemplates());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <LeftPanelTop />
        <Breadcrumb items={breadcrumbItems} />
        {leftPanelContent}
      </div>
      <div className="right-panel">
        <h1 className="logo">MenuCraft</h1>
        <div className="top-section">
          <div className="user-info">
            <img src={user.imageUrl} alt="User" className="user-image" />
            <div>
              <h2 className="user-name">{user.name}</h2>
              <p className="subscription">{user.subscription}</p>
            </div>
          </div>
        </div>

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
                <span className="tool-name">{tool.name}</span>
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">الاعدادات</h2>
          {tools2.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-name">{tool.name}</span>
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">المنيو</h2>
          {tools3.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-name">{tool.name}</span>
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="tools-list">
          <h2 className="tool-header">الدعم</h2>
          {tools4.map((tool, index) => (
            <li
              key={index}
              className={`tool-item ${
                selectedTool === tool.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTool(tool.name)}
            >
              <Link to={`/dashboard/${tool.path}`} className="tool-link">
                <span className="tool-name">{tool.name}</span>
                <span className="tool-icon">
                  <img src={tool.icon} alt={tool.name} width={16} height={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
