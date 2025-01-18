import React, { useEffect, useState } from "react";
import "../../styles/dashboard-elements/menuList.scss";
import { fetchMenuTemplatesForUser } from "../../redux/menu/menuSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const MenusList: React.FC = () => {
  const { templates, currentPage } = useSelector(
    (state: RootState) => state.menu
  );

  const dispatch = useDispatch<AppDispatch>();
  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [viewOption, setViewOption] = useState("grid");
  const [page, setPage] = useState(currentPage);

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
    setSearchTerm(value); // Update search term state
  };
  const handleViewChange = (view: string) => {
    setViewOption(view); // Update viewOption state
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
                    <button className="edit-card-btn">
                      <img
                        src="/Note_Edit.svg"
                        alt="edit-card-btn"
                        width={20}
                      />
                    </button>
                    <button className="delete-card-btn">
                      <img
                        src="/Close_SM.svg"
                        alt="delete-card-btn"
                        width={22}
                      />
                    </button>
                  </div>
                </div>
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
                      <img
                        src="/reviews-menu.svg"
                        alt="Reviews"
                        className="reviews-menu-img"
                        width={20}
                      />
                      34
                    </span>
                    <span>
                      <img
                        src="/menu-report.svg"
                        alt="Menu report"
                        className="menu-report-img"
                        width={20}
                      />
                      1K
                    </span>
                  </div>
                </div>
                <button className="view-menu-content">
                  {window.innerWidth <= 768 ? "View" : "View menu content"}
                </button>{" "}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenusList;
