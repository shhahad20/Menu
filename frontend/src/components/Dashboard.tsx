// Dashboard.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../src/redux/store";
import { fetchMenuData } from "../../src/redux/menu/menuSlice";
import MenuList from "./MenuList";
// import EditMenuItemForm from "./EditMenuItemForm";
import "../styles/dashboard.scss";
import { LeftPanelTop } from "./LeftPanelTop";
import Breadcrumb from "./Breadcrumb";
const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; path: string }[]>([
    { name: "الرئيسية", path: "/" },
  ]);

  const handleToolClick = (toolName: string) => {
    setSelectedTool(toolName);

    // Update breadcrumb based on the selected tool
    const newBreadcrumb = [
      { name: toolName, path: `/dashboard/${toolName}` },
      { name: "الرئيسية", path: "/" },
    ];
    setBreadcrumbItems(newBreadcrumb);
  };
//   const { menuItems, loading, error } = useSelector(
//     (state: RootState) => state.menu
//   );

  // Replace these with actual user data from your state or context
  const user = {
    name: "Shahad",
    subscription: "Premium",
    imageUrl: "/me.jpg", // Placeholder for user image URL
  };
  const tools1 = [
    { icon: "/home.svg", name: "الرئيسية" },
    { icon: "/items.svg", name: "المنتجات" },
    { icon: "/orders.svg", name: "الطلبات" },
    { icon: "/chart.svg", name: "التقارير" },
    { icon: "/report.svg", name: "التسويق" },
    { icon: "/reviews.svg", name: "التقييمات والاقتراحات" },
  ];
  const tools2 = [
    { icon: "/upgrade.svg", name: "ترقية الباقة" },
    { icon: "/setting.svg", name: "إعدادات المينو" },
    { icon: "/notification.svg", name: "التنبيهات" },
    { icon: "/wallet.svg", name: "المحفظة والفواتير" },
  ];
  const tools3 = [
    { icon: "/themes.svg", name: "ثيمات المينو" },
    { icon: "/design-r.svg", name: "طلب تصميم خاص" },

  ];
  const tools4 = [
    { icon: "/reviews.svg", name: "اقتراحاتكم" },
    { icon: "/contact-us.svg", name: "اتصل بنا" },

  ];

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);
  // const handleToolClick = (toolName: string) => {
  //   setSelectedTool(toolName);
  // };
  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <LeftPanelTop/>
        <Breadcrumb items={breadcrumbItems} />
        <div className="left-top-section">
        
        </div>
        
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <MenuList menuItems={menuItems} />} */}
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

        <div className="tools-list">
          {tools1.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-icon ${selectedTool === tool.name ? 'icon-selected' : ''}`}>
                <img src={tool.icon} alt={tool.name} />
              </span>
            </div>
          ))}
        </div>
          
        <div className="tools-list">
        <h2 className="tool-header">الاعدادات</h2>
          {tools2.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>


        <div className="tools-list">
        <h2 className="tool-header">المنيو</h2>
          {tools3.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>

        <div className="tools-list">
        <h2 className="tool-header">الدعم</h2>
          {tools4.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>

        <div className="tools-list">
        <h2 className="tool-header">الدعم</h2>
          {tools4.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>

        <div className="tools-list">
        <h2 className="tool-header">الدعم</h2>
          {tools4.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>

        <div className="tools-list">
        <h2 className="tool-header">الدعم</h2>
          {tools4.map((tool, index) => (
            <div className={`tool-item ${selectedTool === tool.name ? 'selected' : ''}`}  key={index} onClick={() => handleToolClick(tool.name)}>
              <span className="tool-name">{tool.name}</span>
              <img className="tool-icon" src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
