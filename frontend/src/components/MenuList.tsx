// MenuList.tsx
import React from "react";
import EditMenuItemForm from "./EditMenuItemForm";
import { MenuItem } from "../redux/menu/menuSlice";
// import "../styles/menus-style/menuList.scss";


interface MenuListProps {
  menuItems: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);

  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item);
  };

  return (
    <div className="menu-list">
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => handleEditClick(item)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      {editingItem && (
        <EditMenuItemForm item={editingItem} onClose={() => setEditingItem(null)} />
      )}
    </div>
  );
};

export default MenuList;
