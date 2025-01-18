import React from "react";
import "../../styles/ui/pagination.scss";
import { useTheme } from "../../context/ThemeContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { theme } = useTheme();

  // Generate the pagination numbers
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 5) {
      // Show all pages if totalPages <= 5
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More complex logic for larger pagination
      pageNumbers.push(1); // Always include the first page
      if (currentPage > 3) pageNumbers.push("..."); // Ellipsis before the current range

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push("..."); // Ellipsis after the current range
      pageNumbers.push(totalPages); // Always include the last page
    }
    return pageNumbers;
  };

  // Handle page click
  const handlePageClick = (page: number | string) => {
    if (page === "..." || page === currentPage) return; // Do nothing for ellipsis or current page
    onPageChange(Number(page));
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          
        >
          <path
            d="M8 4H1M1 4L4 7M1 4L4 1"
            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Previous</span>
      </button>
      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-number ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L8 4M8 4L5 0.999999M8 4L5 7"
            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
