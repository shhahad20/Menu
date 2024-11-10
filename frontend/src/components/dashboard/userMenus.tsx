import React, { useState } from "react";
import "../../styles/dashboard-elements/createMenu.scss";

const CreateMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="create-menu-section">
      <div className="sort-container">
        <select>
          <option value="1">مضاف مؤخراً</option>
          <option value="1">الاعلى سعراَ</option>
          <option value="1">الادنى سعراَ</option>
        </select>
        <label >تصفية</label>
      </div>

      <button onClick={handleOpenModal} className="add-product-button">
        إضافة منتج جديد
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="form-header"></h2>
            <form>
              <div className="element-contanier">
                <label htmlFor="name">اسم المنتج</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="element-contanier">
                <label htmlFor="description">الوصف</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                />
              </div>
              <div className="element-contanier">
                <label htmlFor="price">السعر</label>
                <input type="number" id="price" name="price" required />
              </div>
              <div className="element-contanier">
                <label htmlFor="category">تصنيف المنتج</label>

                <select id="category" name="categoryId" required>
                  <option value="default">-</option>
                  <option value="1">Salads</option>
                  <option value="1">Burgers</option>
                  <option value="1">Drinks</option>
                </select>
              </div>
              <div className="element-contanier">
                <label htmlFor="name">السعرات الحرارية</label>
                <input type="number" required />
              </div>
              <div className="button-container">
                <button className="submit-button" type="submit">
                  إضافة المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
