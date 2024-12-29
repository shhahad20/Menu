import { Route, Routes } from "react-router-dom";
import "../../styles/dashboard-elements/mainDashboard.scss";
import CreateMenu from "./userMenus";
import MenusList from "./MenusList";
import HomeDashboard from "./HomeElement";

const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <Routes>
        <Route path="/items" element={<CreateMenu />} />
        <Route path="/menus" element={<MenusList />} />
        <Route path="/" element={<HomeDashboard/>} />
      </Routes>
    </div>
  );
};

export default MainDashboard;
