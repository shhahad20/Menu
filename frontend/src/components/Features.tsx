import { useTheme } from "../context/ThemeContext";
import "../styles/features.scss";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Features: React.FC = () => {
  const { theme } = useTheme();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track the cursor position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="feature-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Custom Cursor */}
      <motion.img
        src="/cursor.svg" // Replace with your SVG path
        alt="Custom Cursor"
        animate={{
          x: cursorPos.x - 50, // Offset to center the cursor
          y: cursorPos.y - 50,
          scale: isHovering ? 1.5 : 1, // Scale the cursor when hovering
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        style={{
          width: "20px",
          height: "20px",
          position: "absolute",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />

      {/* Features Section with Border Trail */}

      <section className="feature-section">
        <div className="top-features">
          <div
            className="feature-item f1"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="border">
              <div className="trail"></div>
            </div>
            <h3 className="feature-title">
              Creating and updating your menu has never been easier!
            </h3>
            <p className="feature-description">
              Our intuitive platform allows you to design and modify your menu
              in just a few clicks—no technical skills or coding knowledge
              required. Spend less time worrying about the details and more time
              delighting your customers with great food.
            </p>
            <img src="/feature1.svg" alt="" />
          </div>
          <div
            className="feature-item f2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
                        <div className="border">
              <div className="trail"></div>
            </div>
            <h3 className="feature-title">
              Your menu should reflect your unique culinary identity.
            </h3>
            <p className="feature-description">
              With our extensive customization options, you can tailor every
              aspect of your menu’s design and layout.
            </p>
            {theme === "light" ? (
              <img
                src="/feature2light.svg"
                alt="feature2 Light"
                className="feature2-light"
              />
            ) : (
              <img
                src="/feature2.svg"
                alt="feature2 Dark"
                className="feature2-dark"
              />
            )}
          </div>
        </div>
        <div className="bottom-features">
          <div
            className=" feature-item f3"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
                        <div className="border">
              <div className="trail"></div>
            </div>
            <h3 className="feature-title">Mobile-Friendly</h3>
            <p className="feature-description">
              Our responsive designs ensure that your menu looks stunning and
              functions seamlessly on any device, from smartphones to tablets.
              This means your customers can easily browse your offerings, place
              orders, or make reservations, all while on the go.
            </p>
            <img src="/feature3.svg" alt="" />
          </div>
          <div
            className="feature-item f4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
                        <div className="border">
              <div className="trail"></div>
            </div>
            <h3 className="feature-title">SEO Optimized</h3>
            <p className="feature-description">
              Increase your online visibility and attract more customers with
              our SEO-optimized features. We help you implement best practices
              for search engine optimization.
            </p>
            <img src="/feature4.svg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
