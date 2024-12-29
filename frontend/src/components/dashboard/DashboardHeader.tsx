import { Link } from "react-router-dom";
import "../../styles/dashboard-elements/dashboardHeader.scss";

const DashboardHeader = () => {


  return (
    <div className="d-header">
      <div className="d-top">
        <div className="d-top-left">
          <div className="logo-container">
            <img src="/webMenuIcon.svg" alt="" width={20} />
            <h1 className="logo-name">MenuCraft</h1>
          </div>
        </div>
        <div className="d-top-right">
          <ul>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/">Doc</Link>
            </li>
            <li>
              <Link to="/"><p className="membership">Pro</p></Link>
            </li>
            <li className="noti-header">
              <Link to="/">
                <div className="noti">
                  <img src="/notification.svg" alt="" />
                </div>
              </Link>
            </li>
            <li className="user-header">
              <Link to="/">
                <div className="h-user-icon">
                  <img src="/me.jpg" alt=""/>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="d-bottom"></div> */}
    </div>
  );
};

export default DashboardHeader;
