import { Route, Routes } from "react-router-dom";
import "../../styles/dashboard-elements/mainDashboard.scss";
import MenusList from "./MenusList";
import HomeDashboard from "./HomeElement";
import Products from "./Products";
import RequestDesign from "../../pages/RequestDesign";
import SearchBar from "./SearchBar";

const MainDashboard = () => {
  // const handleSearch = (value: string) => {
  //   console.log("Search input:", value);
  // };

  return (
    <div className="main-dashboard">
        {/* <SearchBar placeholder="Search" onSearch={handleSearch} /> */}

      <Routes>
        <Route path="/items" element={<Products />} />
        <Route path="/menus" element={<MenusList />} />
        <Route path="/request-design" element={<RequestDesign />} />
        <Route path="/" element={<HomeDashboard />} />
      </Routes>
    </div>
  );
};

export default MainDashboard;
