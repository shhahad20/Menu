import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  // const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    // setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileMenuOpen((prevState) => {
      const isOpening = !prevState;
      if (isOpening) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
      return isOpening;
    });
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

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
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? (
              <img
                src="/darkMode.svg"
                alt="Switch to dark mode"
                className="dark-mode-icon"
              />
            ) : (
              <img
                src="/lightMode.svg"
                alt="Switch to light mode"
                className="light-mode-icon"
              />
            )}
          </button>
          <div>
            <Link to="/" className="icon shopping-cart">
              <img src="/cart.svg" alt="cart" className="cart-icon"/>
            </Link>
          </div>
          <div className="user-account" onClick={() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to the login page if not logged in
    } else {
      setMenuOpen((prev) => !prev); // Toggle the menu if logged in
    }
  }}
  ref={menuRef}>
            <img src="/account.svg" alt="account" className="account-icon" />

            {isMenuOpen && isLoggedIn &&(
              <div className="slide-nav">
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
