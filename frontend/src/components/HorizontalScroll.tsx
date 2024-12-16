import React, { useEffect, useRef, useState } from "react";
import "../styles/menus-style/template2.scss";

interface HorizontalScrollProps {
  children: React.ReactNode;
  scrollDistance?: number;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, scrollDistance = 200 }) => {
  const [isRightButtonVisible, setRightButtonVisible] = useState<boolean>(false);
  const [isLeftButtonVisible, setLeftButtonVisible] = useState<boolean>(false);
  
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const updateButtonVisibility = () => {
    if (!outerRef.current || !innerRef.current) return;
    
    const maxWidth = outerRef.current.offsetWidth;
    const actualWidth = Array.from(innerRef.current.children).reduce(
      (acc, child) => acc + (child as HTMLElement).offsetWidth,
      0
    );

    setRightButtonVisible(outerRef.current.scrollLeft > 0);
    setLeftButtonVisible(actualWidth > maxWidth);
  };

  const scrollLeft = () => {
    if (outerRef.current) {
      outerRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (outerRef.current) {
      outerRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateButtonVisibility();
    window.addEventListener("resize", updateButtonVisibility);
    if (outerRef.current) {
      outerRef.current.addEventListener("scroll", updateButtonVisibility);
    }
    
    return () => {
      window.removeEventListener("resize", updateButtonVisibility);
      if (outerRef.current) {
        outerRef.current.removeEventListener("scroll", updateButtonVisibility);
      }
    };
  }, []);

  return (
    <div className="holder">
      <button id="right-button" onClick={scrollRight} style={{ visibility: isRightButtonVisible ? "visible" : "hidden" }}>
        {"<"}
      </button>
      <div className="section-bottom" ref={outerRef} style={{ overflow: "hidden", width: "100%" }}>
        <div className="item-container" ref={innerRef} style={{ display: "flex" }}>{children}</div>
      </div>
      <button id="left-button" onClick={scrollLeft} style={{ visibility: isLeftButtonVisible ? "visible" : "hidden" }}>
        {">"}
      </button>
    </div>
  );
};

export default HorizontalScroll;