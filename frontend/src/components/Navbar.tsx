import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

import "../styles/navbar.scss";
import { AppDispatch } from "../redux/store";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const navigate = useNavigate()
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()) // Use unwrap to handle async logic cleanly
      // localStorage.removeItem('userToken');
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout Error:", error); // Display error for debugging
    }
  };
  

  return (
    <header>
      <div id="navbar">
        <a id="logo-name" href="/">
          MenuCraft
        </a>
        <ul id="navbar_container">
          {/* <div id='logo'>
          <Link to="/">
            <h3 id="logo-name">MenuCraft</h3>
          </Link>
        </div> */}
          {!isMobile && (
            <div id="navbar_elements">
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/menus">Menus</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </div>
          )}
        </ul>
        <div className="icons-container">
          <div className="icons">
            <Link to="/signup" className="icon account">
              <img src="/account.svg" alt="account" />
            </Link>
            <Link to="/" onClick={handleLogout}>
            Logout
            </Link>
            <Link to="/" className="icon shopping-cart">
              <img src="/cart.svg" alt="cart" />
            </Link>
          </div>
        </div>
        {isMobile && (
          <li onClick={handleMobileMenuToggle} id="mobile_menu_toggle">
            {isMobileMenuOpen ? "x" : "="}
          </li>
        )}
        {isMobile && isMobileMenuOpen && (
          <div id="mobile_menu">
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
                <Link to="/menus">Menus</Link>
              </li>
            <li>
              <Link to="/">Pricing</Link>
            </li>
            <li>
              <Link to="/">FAQs</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
