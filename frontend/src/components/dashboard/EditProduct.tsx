import { useParams } from "react-router-dom";
import "../../styles/dashboard-elements/editProduct.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchItemById } from "../../redux/menu/itemSlice";

const EditProduct = () => {
  const { id, templateId } = useParams<{ id: string, templateId: string }>();
  const { sections } = useSelector((state: RootState) => state.sections);
  const {item} = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(()=>{
    if(id && templateId){
        dispatch(fetchItemById({item_id:id, template_id:templateId}))
    }
  },[dispatch, templateId, id])

  console.log("item: "+ item?.item.title)

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const sectionValue = event.target.value; // Fetch the selected value
    if (sectionValue === "") {
      alert("Please select a valid section."); // Display an error message
      return;
    }
    setSelectedSection(sectionValue);
  };
  console.log(sections)
  return (
    <div className="product-edit">
      <form>
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
              name="header"
                value={item?.item.title}
              //   onChange={handleCompChange}
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
              name="slogan"
              value={item?.item.description}
              //   onChange={handleCompChange}
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="tags-input" >
              Price
            </label>
            <input
              type="number"
              id="tags-input"
              value={item?.item.price}
              // onChange={handleInputChange}
              // onKeyDown={handleKeyDown}
              placeholder="Type and press Enter"
              className="editing-input"
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="menu_name" className="">
              Sections
            </label>
            <select
              name="item-section"
              className="section-select"
              onChange={handleOptions}
            //   value={selectedSection}
              required
            >
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
