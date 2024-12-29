import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/breadcrumb.scss";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav className="breadcrumb">
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={index} className="breadcrumb-item">
            {!isLast ? (
              <>
                <Link to={path}>{segment}</Link>
                <span className="breadcrumb-separator"> / </span>
              </>
            ) : (
              <span>{segment}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
