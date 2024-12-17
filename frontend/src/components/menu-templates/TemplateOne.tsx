import { useState } from "react";
import "../../styles/menus-style/template1.scss";

const Template1 = () => {
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const lists = [
    {
      header: "- Hot Drinks",
      items: [
        { title: "Espresso", description: "A shot of rich, aromatic coffee.", price: "$3" },
        { title: "Latte", description: "Espresso blended with steamed milk and a touch of foam.", price: "$3" },
        { title: "Cappuccino", description: "A perfect balance of espresso, steamed milk, and foam.", price: "$3" },
        { title: "Mocha", description: "Espresso, chocolate syrup, and steamed milk topped with whipped cream.", price: "$3" },
        { title: "Matcha Latte", description: "Matcha with steamed milk and a sprinkle of cinnamon.", price: "$3" },
        { title: "Amerciano", description: "Espresso with water.", price: "$3" },
        { title: "V60", description: "Brewed coffee", price: "$5" },
      ],
    },
    {
      header: "- Cold Drinks",
      items: [

        { title: "Iced Coffee", description: "Cold-brewed coffee served over ice.", price: "$4" },
        { title: "Smoothie", description: "A blend of fresh fruits and yogurt.", price: "$5" },
        { title: "Iced Latte", description: "Latte served cold with ice.", price: "$4" },
        { title: "Iced V60", description: "Cold-brewed coffee served over ice.", price: "$5" },
      ],
    },
    {
      header: "- Pastries & Desserts",
      items: [

        { title: "Croissant ", description: "Buttery and flaky, baked fresh daily.", price: "$4" },
        { title: "Muffins", description: "Choose from blueberry, chocolate chip, or classic.", price: "$5" },
        { title: "Cheesecake Slice", description: "Rich and creamy, served plain or topped with fruit.", price: "$4" },
        { title: "Brownie", description: "Decadent chocolate fudge.", price: "$5" },
        { title: "Cookies", description: "Soft-baked with your choice of chocolate chip or oatmeal raisin.", price: "$5" },

      ],
    },
  ];
  const handlePrevious = () => {
    setCurrentListIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : lists.length - 1
    );
  };

  const handleNext = () => {
    setCurrentListIndex((prevIndex) =>
      prevIndex < lists.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="menu-container">
      <div className="menu-navbar">
        <ul className="ul-container">
          <li>Menu</li>
          <li>Offers</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="menu-top-container">
        <div className="top-item">
          <div className="news-container">
            <h1>TODAY’S MOOD IS SPONSORED BY COFFEE</h1>
            <p>Try our NEW Coffee Latte</p>
          </div>
        </div>
        <div className="top-item top-img">
          <img className="menu-img" src="/temp1img_1.svg" alt="" />
        </div>
      </div>

      <div className="menu-bottom-container">
        <div className="t1-bottom-container">
        <div className="arrows">
          <button className="arrow-button left" onClick={handlePrevious}>
            {/* &#8592; Left arrow */}
            <img src="/left-arow.svg" alt=""/>

          </button>
        </div>
        <div className="temp1-list-container">
          <h1 className="t1-list-header">{lists[currentListIndex].header}</h1>

          <div className="t1-list-items">
            {lists[currentListIndex].items.map((item, index) => (
              <div className="t1-item" key={index}>
                <div className="t1-item-content">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <p className="t1-price">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="arrows">
          <button className="arrow-button right" onClick={handleNext}>
            {/* &#8594; Right arrow */}
            <img src="/right-arow.svg" alt=""/>
          </button>
        </div>
      </div>
      </div>
      <footer className="t1-footer">
        <p>Powered by Shahad Altharwa </p>
      </footer>
      
    </div>
  );
};

export default Template1;
