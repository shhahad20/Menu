import "../styles/dashboard.scss";
import DashboardHeader from "./dashboard/DashboardHeader";
import MainDashboard from "./dashboard/MainDashboard";
import Sidebar from "./dashboard/Sidebar";
import Footer from "./Footer";

const Dashboard = () => {


  return (
    <div className="dashboard">
      <div className="dashboard-header"><DashboardHeader/></div>
      <div className="sidebar"><Sidebar /></div>
      <div className="dashboard-main"><MainDashboard/></div>
      <div className="dashboard-footer"><Footer/></div>
    </div>
  );
};

export default Dashboard;
