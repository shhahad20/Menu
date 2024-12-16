// Breadcrumb.tsx
import React from "react";
import "../styles/breadcrumb.scss";

interface BreadcrumbProps {
  items: { name: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index < items.length - 1 ? (
            <>
              <a href={item.path}>{item.name}</a>
              <span className="breadcrumb-separator"> / </span>
            </>
          ) : (
            <span>{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
