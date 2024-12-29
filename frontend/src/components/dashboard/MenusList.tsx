import React, { useEffect } from "react";
// import "../../styles/dashboard-elements/menusList.scss";
import {
  fetchMenuTemplatesForUser,
} from "../../redux/menu/menuSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const MenusList: React.FC = () => {
  const { templates, loading } = useSelector((state: RootState) => state.menu);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  dispatch(fetchMenuTemplatesForUser());
  },[dispatch]);

  if (loading) return <p>Loading menus...</p>;
  return (
    <div className="menus-list">
      <h2>User Menus</h2>
      {(!templates || templates.length === 0) ? (
        <p>No menus found.</p>
      ) : (
        <ul className="menus-wrapper">
          {templates.map((template) => (
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
  );
};

export default MenusList;
