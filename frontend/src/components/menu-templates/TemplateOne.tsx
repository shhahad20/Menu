import React, { useState } from 'react';
import '../../styles/menus-style/template1.scss'

const categories = ['All', 'Salad', 'Burger', 'Pasta', 'Drinks'];
// interface MenuItem {
//     name: string;
//     description: string;
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     price: number;
//     image: string;
//     category: string;
//     isPopular?: boolean;
//     isOnlineOnly?: boolean;
//   }
  
const Template1 = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');



    const menuItems = [
        {
          name: 'Peach + Burrata',
          description: 'Peaches, burrata, tomatoes, cucumbers, basil, mint, balsamic vinaigrette',
          calories: 435,
          protein: 11,
          carbs: 25,
          fat: 26,
          image: '/dish1.png', // Replace with the actual image paths
          isPopular: true,
          isOnlineOnly: false,
          price: 39.5,
          category: 'Burger',
        },
        {
          name: 'QUINOA SALAD',
          description: 'A nutritious blend of fluffy quinoa, colorful bell peppers, crunchy cucumbers, and fresh herbs, this salad is both vibrant and filling. Tossed in a zesty lemon vinaigrette, it offers a delightful balance of flavors',
          calories: 445,
          protein: 11,
          carbs: 26,
          fat: 26,
          image: '/dish2.svg',
          isPopular: false,
          isOnlineOnly: false,
          price:50,
          category: 'Salad',
        },
      ];
      const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
      };
    
      const filteredMenuItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory);
  return (
<div className="menu-container">
      <h1>Brand Name</h1>
      <div className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
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
            {item.isOnlineOnly && <span className="badge online-only">Online Only</span>}
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
