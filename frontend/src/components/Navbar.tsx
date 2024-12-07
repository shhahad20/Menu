import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

import "../styles/navbar.scss";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()); // Use unwrap to handle async logic cleanly
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
              
                <button onClick={toggleTheme} className="theme-toggle">
                  {theme === "light"
                    ? "Dark Mode"
                    : "Light Mode"}
                </button>
              
            </div>
          )}
        </ul>
        <div className="icons-container">
          <div className="user-account" onClick={toggleMenu}>
            <img src="/account.svg" alt="account" width={18} />

            {isMenuOpen && (
              <div className="slide-nav">
                {/* Conditional link and text based on login state */}
                {isLoggedIn ? (
                  <Link to="/dashboard" className="icon account">
                    <div className="slide-item">Dashboard</div>
                  </Link>
                ) : (
                  <Link to="/signup" className="icon account">
                    <div className="slide-item">Signup / Login</div>
                  </Link>
                )}
                {isLoggedIn && (
                  <Link to="/" onClick={handleLogout}>
                    <div className="slide-item logout-btn">
                      Logout
                      <img
                        className="logout-icon"
                        src="/logout-red.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div>
            <Link to="/" className="icon shopping-cart">
              <img src="/cart.svg" alt="cart" width={25} />
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
