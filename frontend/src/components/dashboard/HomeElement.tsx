import { useEffect, useState } from "react";
import "../../styles/dashboard-elements/homeElement.scss";
import { fetchMenuTemplatesForUser } from "../../redux/menu/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

const HomeDashboard = () => {
  const { templates,totalPages, currentPage, loading } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();

  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(8); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name"); 
  const [viewOption, setViewOption] = useState("list"); // Default view is list
  const [page, setPage] = useState(currentPage); // Current page

  useEffect(() => {
    const validatedSortOrder = sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;
    dispatch(fetchMenuTemplatesForUser({ page, searchTerm, sortOption, sortOrder: validatedSortOrder, limit }));
  }, [dispatch, page, searchTerm, sortOption, sortOrder, limit]);

  if (loading) return <p>Loading menus...</p>;
 
  // Filter templates based on the search term
  const filteredTemplates = templates?.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort templates based on the selected option
  const sortedTemplates = filteredTemplates?.sort((a, b) => {
    if (sortOption === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortOption === "date") {
      return sortOrder === "asc"
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });
 // Handle Pagination
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="d-home">
        <div className="d-home-container">
      <div className="d-home-topbar">
        <input
          type="text"
          placeholder="Search Menus and templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-dropdown"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
        <select
            value={sortOrder}
            onChange={(e) => setsortOrder(e.target.value as "asc" | "desc")}
            className="sort-order-dropdown"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="limit-dropdown"
          >
            <option value={4}>Show 4</option>
            <option value={8}>Show 8</option>
            <option value={12}>Show 12</option>
          </select>
        <div className="view-options">
          <button
            className={`view-btn ${viewOption === "list" ? "active" : ""}`}
            onClick={() => setViewOption("list")}
          >
            List View
          </button>
          <button
            className={`view-btn ${viewOption === "grid" ? "active" : ""}`}
            onClick={() => setViewOption("grid")}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Templates List */}
      <div className={`menus-list ${viewOption}`}>
        
        {!sortedTemplates || sortedTemplates.length === 0 ? (
          <p>No menus found.</p>
        ) : (
          <ul className="menus-wrapper">
            {sortedTemplates.map((template) => (
              <li key={template.id} className="menu-items">
                <div className="child-item">
                  <h3>{template.name}</h3>
                  <ul className="sections-list">
                    {template.template_sections?.map((section) => (
                      <li key={section.section_id} className="section-item">
                        <h4>{section.header}</h4>
                        <ul className="items-list">
                          {section.template_items?.map((item) => (
                            <li key={item.id} className="item">
                              {item.title} - ${item.price}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="pagination-controls">
          <button disabled={page === 1} onClick={handlePreviousPage}>
            {"<"}
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={handleNextPage}>
          {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
