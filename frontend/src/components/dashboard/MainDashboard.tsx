import { Route, Routes } from "react-router-dom";
import "../../styles/dashboard-elements/mainDashboard.scss";
import MenusList from "./MenusList";
import HomeDashboard from "./HomeElement";
import Products from "./Products";

const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <Routes>
        <Route path="/items" element={<Products />} />
        <Route path="/menus" element={<MenusList />} />
        <Route path="/" element={<HomeDashboard/>} />
      </Routes>
    </div>
  );
};

export default MainDashboard;
