import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchItems } from "../../redux/menu/itemSlice";
import "../../styles/dashboard-elements/products.scss";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, currentPage, totalPages, loading } = useSelector(
    (state: RootState) => state.items
  );
  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [viewOption, setViewOption] = useState("list");
  const [page, setPage] = useState(currentPage);

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

  console.log(items)
  if (loading) return <p>Loading items...</p>;

  const filteredItems = items?.filter(
    (item) =>
      item.title &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log("Filtered Items:", filteredItems);

  const sortedItems = filteredItems?.sort((a, b) => {
    if (sortOption === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }else if (sortOption === "price") {
      const priceA = parseFloat(a.price) || 0; // Default to 0 if parsing fails
      const priceB = parseFloat(b.price) || 0; // Default to 0 if parsing fails
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    }
    return 0;
  });

  console.log(sortedItems);

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
            placeholder="Search items ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="title">Sort by Name</option>
            <option value="price">Sort by Price</option>
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

        <div className={`items-list list ${viewOption}`}>
          <div className="items-wrapper">
            {!sortedItems || sortedItems.length === 0 ? (
              <p>No Items found.</p>
            ) : (
              sortedItems.map((item) => (
                <div className="d-items" key={item.item_id}>
                  <div className="sections-list">
                    <div
                      className="section-item"
                      key={item.template_sections.section_id}
                    >
                      <ul className="item-list">
                        <li className="item" key={item.item_id}>
                          <div className="d-item-top">
                            <img src="/dish2.svg" alt="" />
                          </div>
                          <div className="d-item-bottom">
                            <h2 className="d-item-name">
                              {item.title} - ${item.price}
                            </h2>
                            <p className="d-item-description">
                              {item.description}
                            </p>
                            {/* <p className="d-item-price">$ {item.itemPrice}</p>  */}
                            <p className="d-item-template">
                              Menu: {item.template_sections.templates.id}
                            </p>
                            <p className="d-item-section">
                              Section: {item.template_sections.header}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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

export default Products;
