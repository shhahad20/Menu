import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchItems,
  Item,
} from "../../redux/menu/itemSlice";
import "../../styles/dashboard-elements/products.scss";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.items);
  console.log(items);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);


  return (
    <div className="d-home">
    <div className="d-home-container">
      <div className="d-home-topbar">
        <input
          type="text"
          placeholder="Search items..."
          className="search-bar"
        />
        <select className="sort-dropdown">
          <option value="default">Sort by</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <div className="view-options">
          <button className="view-btn active">List View</button>
          <button className="view-btn">Grid View</button>
        </div>
      </div>

      <div className="items-list list">
        <div className="items-wrapper">
          {items.length > 0 ? (
            items.map((template) => (
              <div className="d-items" key={template.templateName}>
                {/* <h3>{template.templateName}</h3> */}
                <div className="sections-list">
                  {template.sections.map((section) => (
                    <div className="section-item" key={section.sectionName}>
                      <h4>{section.sectionName}</h4>
                      <ul className="item-list">
                        {section.items.map((item: Item) => (
                          <li className="item" key={item.itemId}>
                            <div className="d-item-top">
                            <img src="/dish2.svg" alt=""/>
                             </div>
                             <div className="d-item-bottom">
                             <h2 className="d-item-name">{item.itemName} - ${item.itemPrice}</h2>
                            <p className="d-item-description">
                              {item.itemDescription}
                            </p>
                            {/* <p className="d-item-price">$ {item.itemPrice}</p>  */}
                            <p className="d-item-template">Menu: {template.templateName}</p>
                            <p className="d-item-section">Section: {section.sectionName}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Products;
