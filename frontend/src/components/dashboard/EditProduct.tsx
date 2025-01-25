import { useParams } from "react-router-dom";
import "../../styles/dashboard-elements/editProduct.scss";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const EditProduct = () => {
  const { id } = useParams<{ componentId: string }>();
  const [selectedSection, setSelectedSection] = useState("");
  const { sections } = useSelector((state: RootState) => state.sections);

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const sectionValue = event.target.value; // Fetch the selected value
    if (sectionValue === "") {
      alert("Please select a valid section."); // Display an error message
      return;
    }
    setSelectedSection(sectionValue);
  };
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
              //   value={compData.header}
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
              //   value={compData.slogan}
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
              // value={inputValue}
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
              value={selectedSection || ""}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
