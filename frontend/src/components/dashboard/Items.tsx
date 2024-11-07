// Items.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchItems, addItem, updateItem, deleteItem, Item } from '../../redux/menu/itemSlice';

const Items = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = () => {
    dispatch(addItem({ ...newItem, id: Date.now() }));
    setNewItem({ name: '', description: '' });
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      dispatch(updateItem(editingItem));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h1>Items</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {/* Display Items */}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <button onClick={() => setEditingItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add New Item */}
      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>

      {/* Edit Item */}
      {editingItem && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingItem.name}
            onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingItem.description}
            onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
          />
          <button onClick={handleUpdateItem}>Update Item</button>
          <button onClick={() => setEditingItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Items;
