// EditMenuItemForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMenuData } from "../../src/redux/menu/menuSlice";
import { MenuItem } from "../redux/menu/menuSlice";
import { AppDispatch } from "../redux/store";

interface EditMenuItemFormProps {
    item: MenuItem;
    onClose: () => void;
  }
  
  const EditMenuItemForm: React.FC<EditMenuItemFormProps> = ({ item, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [category, setCategory] = useState(item.category.name);
    const [imageUrl, setImageUrl] = useState(item.image);
  
    const handleSave = () => {
      const updatedItem = { ...item, name, description, price, category: { name: category }, image: imageUrl };
      dispatch(updateMenuData(updatedItem));
      onClose();
    };

  return (
    <div className="edit-menu-item-form">
      <h3>Edit {item.name}</h3>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      <label>Category:</label>
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <label>Image URL:</label>
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditMenuItemForm;
