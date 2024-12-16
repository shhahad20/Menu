import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; 
import {fetchItems, createItem, editItem, removeItem, Item } from '../../redux/menu/itemSlice';
import "../../styles/dashboard-elements/createMenu.scss";


const CreateMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [selectedCategory, setCategory] = useState('')

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    description: '',
    category: selectedCategory,
    image_url: undefined,
    calories: 0,
    isPopular: isPopular,
    isNew: isNew
  })

  const items = useSelector((state: RootState) => state.items.items);
  
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
console.log(items)

  const handleUpdate = (updatedItem: Item) => {
    dispatch(editItem(updatedItem));
  };
  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.type === 'file') {
  //     const imageFile = event.target.files?.[0]
  //     const { name } = event.target
  //     setNewItem((prevItem) => ({
  //       ...prevItem,
  //       [name]: imageFile
  //     }))
  //   } else {
  //     const { value, name } = event.target
  //     setNewItem((prevItem) => ({
  //       ...prevItem,
  //       [name]: value
  //     }))
  //   }
  // };
  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = event.target.value
    setCategory(categoryValue)
    setNewItem((prevItem) => ({
      ...prevItem,
      category: categoryValue
    }))
  }
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'file') {
      const imageFile = event.target.files?.[0]
      const { name } = event.target

      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: imageFile
      }))
    } else {
      const { value, name } = event.target
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: value
      }))
    }
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    const formData = new FormData()
    formData.append('name', newItem.name);
    formData.append('description', newItem.description);
    formData.append('price', newItem.toString()); 
    formData.append('category', newItem.category);
    formData.append('calories', newItem.toString()); 
    formData.append('isPopular', newItem.toString()); 
    formData.append('isNew', newItem.toString()); 


    if (newItem.image_url) {
      formData.append('image', newItem.image_url as Blob)
    }
    try {
      const response = await dispatch(createItem(formData))
      console.log(response)
      setIsModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="create-menu-section">
      <div className="top-container">
        <div className="sort-container">
          <select>
            <option value="1">مضاف مؤخراً</option>
            <option value="1">الاعلى سعراَ</option>
            <option value="1">الادنى سعراَ</option>
          </select>
          <label>تصفية</label>
        </div>

        <button onClick={handleOpenModal} className="add-product-button">
          إضافة منتج جديد
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="form-header">أضف منتج جديد</h2>
            <form onSubmit={handleSubmit}>
              <div className="element-container">
                <label htmlFor="name">اسم المنتج</label>
                <input type="text" id="name" name="name" value={newItem.name} onChange={handelChange} required />
              </div>
              <div className="element-container">
                <label htmlFor="description">الوصف</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handelChange}
                  required
                />
              </div>
              <div className="element-container">
                <label htmlFor="price">السعر</label>
                <input type="number" id="price" name="price" value={newItem.price} onChange={handelChange} required />
              </div>
              <div className="element-container">
                <label htmlFor="category">تصنيف المنتج</label>
                <select id="category" name="categoryId" onChange={handleOptions} required>
                  <option value="default">-</option>
                  <option value="1">Salads</option>
                  <option value="1">Burgers</option>
                  <option value="1">Drinks</option>
                </select>
              </div>
              <div className="element-container">
                <label htmlFor="calories">السعرات الحرارية</label>
                <input type="number" id="calories" name="calories" value={newItem.calories} onChange={handelChange} required />
              </div>
              <div className="image-container">
                <label htmlFor="image">صورة المنتج</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handelChange}
                />
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={() => setIsPopular(!isPopular)}
                  />
                  منتج شائع
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={() => setIsNew(!isNew)}
                  />
                  منتج جديد
                </label>
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
      <div className="bottom-container">
        {/* <h3>قائمة المنتجات</h3> */}

        <div className="product-list">
          <ul>
            {items.length > 0 && items.map((item: Item) =>{ 

              return(

              <li key={item.id} className="product-item">
                <img src={item.image_url as string} alt={item.name} width={250} />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>السعر: {item.price} ريال</p>
                <p>التصنيف: {item.category.name}</p>
                <p>السعرات الحرارية: {item.calories}</p>
                {item.isPopular && <p>🔥 منتج شائع</p>}
                {item.isNew && <p>🆕 منتج جديد</p>}
                <div className="item-btns">
                <button onClick={() => handleUpdate({ ...item, name: 'Updated Name' })}>تعديل</button>
                <button onClick={() => handleDelete(item.id)}>حذف</button>
                </div>

              </li>
            );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
