import React, { useEffect, useState } from "react";
import "../../styles/dashboard-elements/menuList.scss";
import { deleteMenu, fetchMenuTemplatesForUser } from "../../redux/menu/menuSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Pagination from "../ui/Pagination";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const MenusList: React.FC = () => {
  const { templates, totalPages, currentPage } = useSelector(
    (state: RootState) => state.menu
  );

  const dispatch = useDispatch<AppDispatch>();
  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [viewOption, setViewOption] = useState("grid");
  const [page, setPage] = useState(currentPage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { theme } = useTheme();

  useEffect(() => {
    const validatedSortOrder =
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;
    dispatch(
      fetchMenuTemplatesForUser({
        page,
        searchTerm,
        sortOption,
        sortOrder: validatedSortOrder,
        limit,
      })
    );
  }, [dispatch, page, searchTerm, sortOption, sortOrder, limit]);

  const handleSearch = (value: string) => {
    setSearchTerm(value); 
  };
  const handleViewChange = (view: string) => {
    setViewOption(view); 
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleDeleteMenu = async (id: string) => {
    try {
      await dispatch(deleteMenu(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };
  

  console.log("View option is: " + viewOption);
  return (
    <>
      <SearchBar
        placeholder="Search"
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />

      <div className="menus-list">
        {!templates || templates.length === 0 ? (
          <p>No menus found.</p>
        ) : (
          <div
            className={`menus-wrapper ${
              viewOption === "list" ? "list-view" : ""
            }`}
          >
            {templates.map((template) => (
              <div key={template.id} className="menu-card">
                <div className="menu-header">
                  <div className="card-header-p">
                    <h3>{template.name}</h3>
                    <p>
                      Created at{" "}
                      {new Date(template.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="card-top-icons">
                    <Link to={`${template.id}`} target="_blank">
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
                    <button className="delete-card-btn" onClick={() =>handleDeleteMenu(template.id)}>
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
                <div className="menu-card-bottom">
                <div className="menu-status">
                  <span className="status-icon active">
                    {" "}
                    <img
                      src="/active-menu.svg"
                      alt="active-menu"
                      className="active-menu-img"
                      width={20}
                    />
                    Active
                  </span>
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
                          d="M5.83634 9.99403C7.8091 9.88447 9.375 8.25016 9.375 6.25C9.375 4.17893 7.69607 2.5 5.625 2.5C3.55393 2.5 1.875 4.17893 1.875 6.25C1.875 6.98794 2.08809 7.67606 2.45618 8.25623L2.19116 9.05128L2.19074 9.05245C2.08923 9.35696 2.03846 9.50929 2.07461 9.61068C2.10612 9.69903 2.17605 9.76867 2.2644 9.80018C2.36545 9.83621 2.51672 9.78579 2.81918 9.68497L2.82349 9.68366L3.61877 9.41864C4.19894 9.78673 4.8871 9.99989 5.62504 9.99989C5.69595 9.99989 5.7664 9.99792 5.83634 9.99403ZM5.83634 9.99403C5.83639 9.99418 5.83629 9.99389 5.83634 9.99403ZM5.83634 9.99403C6.34942 11.4537 7.74006 12.5001 9.37509 12.5001C10.113 12.5001 10.801 12.2868 11.3812 11.9186L12.1763 12.1837L12.1778 12.184C12.4823 12.2855 12.6349 12.3363 12.7363 12.3002C12.8246 12.2687 12.8937 12.199 12.9252 12.1107C12.9614 12.0091 12.9107 11.8566 12.809 11.5513L12.5439 10.7562L12.6327 10.6091C12.9461 10.0612 13.1247 9.42644 13.1247 8.75C13.1247 6.67894 11.4461 5 9.375 5L9.23462 5.00259L9.16382 5.00605"
                          stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      34
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
                          d="M1.875 9.37514V10.5C1.875 11.2001 1.875 11.5499 2.01124 11.8172C2.13108 12.0524 2.32217 12.244 2.55737 12.3639C2.8245 12.5 3.17437 12.5 3.87307 12.5H13.1251M1.875 9.37514V3.125M1.875 9.37514L4.28337 7.36816L4.28537 7.36657C4.72104 7.0035 4.9393 6.82162 5.17596 6.74774C5.45554 6.66047 5.75669 6.67427 6.02722 6.7865C6.25656 6.88164 6.45766 7.08274 6.85985 7.48493L6.86388 7.48896C7.27232 7.8974 7.47708 8.10216 7.7101 8.19709C7.98585 8.30942 8.29283 8.3191 8.57544 8.22536C8.81504 8.14588 9.03388 7.95472 9.47144 7.57185L13.125 4.375"
                          stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      1K
                    </span>
                  </div>
                </div>
                <Link to={`/templates/${template.component_id}`} target="_blank">
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
                    "View menu content"
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

export default MenusList;
