import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchItems, removeItem } from "../../redux/menu/itemSlice";
import "../../styles/dashboard-elements/products.scss";
import SearchBar from "./SearchBar";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Pagination from "../ui/Pagination";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, currentPage, totalPages, loading } = useSelector(
    (state: RootState) => state.items
  );
  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [viewOption, setViewOption] = useState("grid");
  const [page, setPage] = useState(currentPage);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const validatedSortOrder =
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;
    dispatch(
      fetchItems({
        page,
        searchTerm,
        sortOption,
        sortOrder: validatedSortOrder,
        limit,
      })
    );
  }, [dispatch, page, searchTerm, sortOption, sortOrder, limit]);

  console.log(items);
  if (loading) return <p>Loading items...</p>;

  const filteredItems = items?.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = filteredItems?.sort((a, b) => {
    if (sortOption === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortOption === "price") {
      const priceA = parseFloat(a.price) || 0; // Default to 0 if parsing fails
      const priceB = parseFloat(b.price) || 0; // Default to 0 if parsing fails
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    }
    return 0;
  });
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const handleViewChange = (view: string) => {
    setViewOption(view);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleDelete = async (id: string) => {
    try {
      await dispatch(removeItem(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  return (
    <>
      <SearchBar
        placeholder="Search"
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />
      {/* ----------------------------------------- */}
      <div className="menus-list">
        {!items || items.length === 0 ? (
          <p>Not found.</p>
        ) : (
          <div
            className={`menus-wrapper ${
              viewOption === "list" ? "list-view" : ""
            }`}
          >
            {items.map((item) => (
              <div key={item.item_id} className="menu-card">
                <div className="menu-header">
                  <div className="card-header-p">
                    <h3>{item.title}</h3>
                    <p>
                      Created at 14 May, 2025{" "}
                      {/* {new Date(item.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )} */}
                    </p>
                    <p>Price: {item.price} SAR</p>
                  </div>
                  <div className="card-top-icons">
                    <Link to={`${item.item_id}`}>
                      <button className="edit-card-btn">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 20h9"></path>
                          <path
                            d="M6.25012 2.5H4.50012C3.80006 2.5 3.44976 2.5 3.18237 2.63624C2.94717 2.75608 2.75608 2.94717 2.63624 3.18237C2.5 3.44976 2.5 3.80006 2.5 4.50012V10.5001C2.5 11.2002 2.5 11.55 2.63624 11.8174C2.75608 12.0526 2.94717 12.2441 3.18237 12.3639C3.4495 12.5 3.79937 12.5 4.49807 12.5H10.5019C11.2006 12.5 11.55 12.5 11.8171 12.3639C12.0523 12.2441 12.244 12.0524 12.3639 11.8172C12.5 11.5501 12.5 11.2006 12.5 10.5019V8.75M10 3.125L6.25 6.875V8.75H8.125L11.875 5M10 3.125L11.875 1.25L13.75 3.125L11.875 5M10 3.125L11.875 5"
                            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </Link>
                    <button
                      className="delete-card-btn"
                      onClick={() => handleDelete(item.item_id)}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.99999 9.99999L7.50001 7.50001M7.50001 7.50001L5 5M7.50001 7.50001L10 5M7.50001 7.50001L5 10"
                          stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>{item.description}</div>
                <div className="menu-card-bottom">
                  <div className="menu-status">
                    {/* <span className="status-icon active">
                      {" "}
                      <img
                        src="/active-menu.svg"
                        alt="active-menu"
                        className="active-menu-img"
                        width={20}
                      />
                      Active
                    </span> */}
                    <div className="menu-stats">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.75 4.50012V10.4284C3.75 11.279 3.75 11.7043 3.87757 11.9645C4.11403 12.447 4.63223 12.7242 5.16479 12.6534C5.45213 12.6151 5.80602 12.3792 6.51381 11.9073L6.51551 11.9062C6.79605 11.7192 6.93634 11.6257 7.0831 11.5738C7.35263 11.4785 7.64672 11.4785 7.91626 11.5738C8.06331 11.6258 8.20415 11.7197 8.48582 11.9074C9.19361 12.3793 9.54791 12.615 9.83524 12.6533C10.3678 12.7241 10.886 12.447 11.1224 11.9645C11.25 11.7043 11.25 11.2789 11.25 10.4284V4.49807C11.25 3.79937 11.25 3.4495 11.1139 3.18237C10.994 2.94717 10.8023 2.75608 10.5671 2.63624C10.2997 2.5 9.95019 2.5 9.25012 2.5H5.75012C5.05006 2.5 4.69976 2.5 4.43237 2.63624C4.19717 2.75608 4.00608 2.94717 3.88624 3.18237C3.75 3.44976 3.75 3.80006 3.75 4.50012Z"
                            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 4.80892C6.25 1.87489 1.875 2.18739 1.875 5.93741C1.875 9.68743 7.5 12.8125 7.5 12.8125C7.5 12.8125 13.125 9.68743 13.125 5.93741C13.125 2.18739 8.75 1.87489 7.5 4.80892Z"
                            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        54
                      </span>
                    </div>
                  </div>
                  <Link to={`/`} target="_blank">
                    <button className="view-menu-content">
                      {isMobile && viewOption === "list" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.25012 3.125H5.12512C4.42506 3.125 4.07476 3.125 3.80737 3.26124C3.57217 3.38108 3.38108 3.57217 3.26124 3.80737C3.125 4.07476 3.125 4.42506 3.125 5.12512V9.87512C3.125 10.5752 3.125 10.925 3.26124 11.1924C3.38108 11.4276 3.57217 11.619 3.80737 11.7389C4.0745 11.875 4.42437 11.875 5.12307 11.875H9.87693C10.5756 11.875 10.925 11.875 11.1921 11.7389C11.4273 11.619 11.619 11.4274 11.7389 11.1922C11.875 10.9251 11.875 10.5756 11.875 9.87693V8.75M12.5 5.625V2.5M12.5 2.5H9.375M12.5 2.5L8.125 6.875"
                            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        "View Item Details"
                      )}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Products;
