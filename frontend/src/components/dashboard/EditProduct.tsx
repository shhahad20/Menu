import { useNavigate, useParams } from "react-router-dom";
import "../../styles/dashboard-elements/editProduct.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchItemById, updateItem } from "../../redux/menu/itemSlice";
import { fetchSectionsForTemplate } from "../../redux/menu/sectionSlice";

const EditProduct = () => {
  const { id, templateId } = useParams<{ id: string; templateId: string }>();
  const { sections } = useSelector((state: RootState) => state.sections);
  const { item } = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const [updatedItem, setupdatedItem] = useState({
    item_id: id,
    title: item?.item.title || "",
    description: item?.item.description || "",
    price: item?.item.price || 0,
    section_id: item?.section.section_id || "",
  });
  // useEffect(() => {
  //   if (item) {
  //     setupdatedItem({
  //       item_id: id,
  //       title: item.item.title || "",
  //       description: item.item.description || "",
  //       price: item.item.price || 0,
  //       section_id: item.section.section_id || "",
  //     });
  //   }
  // }, [item]);

  useEffect(() => {
    if (templateId) {
      dispatch(fetchSectionsForTemplate(templateId));
    }
  }, [templateId, dispatch]);

  useEffect(() => {
    if (id && templateId) {
      dispatch(fetchItemById({ item_id: id, template_id: templateId }));
    }
  }, [dispatch, templateId, id]);

  useEffect(() => {
    if (item?.section.section_id) {
      setSelectedSection(item.section.section_id);
    }
  }, [item]);

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const sectionValue = event.target.value;
    if (sectionValue === "") {
      alert("Please select a valid section.");
      return;
    }
    setupdatedItem((prev) => ({
      ...prev,
      section_id: sectionValue,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setupdatedItem((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      !updatedItem.title ||
      !updatedItem.description ||
      !updatedItem.price ||
      !updatedItem.section_id
    ) {
      alert("Please fill out all fields.");
      return;
    }
    console.log(updatedItem);
    dispatch(updateItem(updatedItem ))
      .then(() => {
        alert("Item updated successfully!")
      navigate(`/dashboard/items`);}
    )
      .catch((error) => alert("Failed to update item: " + error));
  };
console.log(updatedItem)
  return (
    <div className="product-edit">
      <form onSubmit={handleSubmit}>
        <div className="form-s-container">
          <h1 className="forms-header">Edit Product</h1>
          <div className="input-label-container">
            <label htmlFor="menu_name" className="">
              Title
            </label>
            <input
              className="editing-input"
              type="text"
              id="menu_name"
              name="title"
              value={updatedItem.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="menu_name" className="">
              Description
            </label>
            <input
              className="editing-input"
              type="text"
              id="menu_name"
              name="description"
              value={updatedItem.description}
              onChange={handleChange}
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="tags-input">Price</label>
            <input
              type="number"
              id="tags-input"
              name="price"
              value={updatedItem.price}
              onChange={handleChange}
              placeholder="Type and press Enter"
              className="editing-input"
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="menu_name" className="">
              Sections
            </label>
            <select
              name="section_id"
              className="section-select"
              onChange={handleOptions}
              value={updatedItem.section_id}
              required
            >
              <option value="" disabled>
                Select a section
              </option>
              {sections
                .filter((section) => section.section_id && section.header)
                .map((section) => (
                  <option key={section.section_id} value={section.section_id}>
                    {section.header}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
