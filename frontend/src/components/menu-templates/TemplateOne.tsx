import { useEffect, useState } from "react";
import "../../styles/menus-style/template1.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Import your own RootState
import { fetchMenuData, MenuItem } from "../../redux/menu/menuSlice";

const Template1 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, menuItems, loading, error } = useSelector(
    (state: RootState) => state.menu // Use your own RootState here
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch menu data on component mount
  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter menu items based on selected category
  const filteredMenuItems =
  selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item: MenuItem) => item.category.name === selectedCategory);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-container">
      <h1>Brand Name</h1>
      <div className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filteredMenuItems.map((item, index) => (
          <div key={index} className="menu-item">
            {item.isPopular && <span className="badge popular">Popular</span>}
            {item.isOnlineOnly && (
              <span className="badge online-only">Online Only</span>
            )}
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3 className="menu-item-title">{item.name}</h3>
            <p className="menu-item-description">{item.description}</p>
            <div className="menu-item-price">Price: ${item.price.toFixed(2)}</div>
            <div className="menu-item-info">
              <span>{item.calories} Calories</span>
              <span>{item.protein}g Protein</span>
              <span>{item.carbs}g Carbs</span>
              <span>{item.fat}g Fat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template1;
