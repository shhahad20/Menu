import { ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/ui/accordion.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSectionItems, removeItem } from "../../redux/menu/itemSlice";
interface ItemsAccordionProps {
  templateId: string | undefined;
}

const ItemsAccordion: React.FC<ItemsAccordionProps> = ({ templateId }) => {
  const { theme } = useTheme();
  const [activeEditId, setActiveEditId] = useState<string | null>(null); // Track active edit ID
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [updatedValue, setUpdatedValue] = useState<string>(""); // Updated value for editing

  const { sections } = useSelector((state: RootState) => state.sections);
  const { items } = useSelector((state: RootState) => state.items);
  const dispatch: AppDispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    if (templateId && selectedSection) {
      dispatch(fetchSectionItems({ template_id: templateId, section_id:selectedSection }));
    }
  }, [dispatch, templateId, selectedSection]);


  const toggleAccordionContainer = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };
  const handleEditClick = (id: string) => {
    setActiveEditId(id);
    // setUpdatedValue(currentValue);
  };
  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
  };
  const handleSaveClick = () => {
    if (activeEditId) {
      handleEditClick(activeEditId);
      setActiveEditId(null);
      setUpdatedValue("");
    }
  };

  const handleCancelEdit = () => {
    setActiveEditId(null);
    setUpdatedValue("");
  };
 
    const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
      const sectionValue = event.target.value; // Fetch the selected value
      if (sectionValue === "") {
        alert("Please select a valid section."); // Display an error message
        return;
      }
      setSelectedSection(sectionValue)
    };

    console.log(items)
  return (
    <div className="items-section-conatiner">
    <div className="editing-item-section">
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
      <div className="accordion-wrapper">
        <div className="acc-container">
          <div className="accordion">
            <div
              className="accordion-header"
              onClick={toggleAccordionContainer}
            >
              <h2>Items</h2>
              <button className="toggle-btn">
                {isAccordionOpen ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L4 1L7 4"
                      stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L4 4L1 1"
                      stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            {isAccordionOpen && (
              <div className="accordion-table">
                <div className="accordion-table-header">
                  <div>Name</div>
                  <div>Description</div>
                  <div>Price</div>
                  <div>Section</div>
                  <div>Actions</div>
                </div>
                {items.map((item) => (
                  <div key={item.item_id} className="accordion-table-row">
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                    <div>{item.price}</div>
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(item.item_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.item_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Edit Section Below Accordion */}
          {activeEditId && (
            <div className="edit-section">
              <h3>Edit Item</h3>
              <input
                type="text"
                // value={updatedValue}
                // onChange={(e) => setUpdatedValue(e.target.value)}
                placeholder="Update item"
                className="update-input"
              />
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
export default ItemsAccordion;
