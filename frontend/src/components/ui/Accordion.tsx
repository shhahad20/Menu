import { useState } from "react";
// import { fetchSectionsForTemplate, removeSection, Section } from "../../redux/menu/sectionSlice";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import "../../styles/ui/accordion.scss";
import { useTheme } from "../../context/ThemeContext";
interface AccordionProps<T> {
  title: string; // Title of the accordion
  data: T[]; // Generic data array
  onEdit: (id: string, updatedValue: string) => void; // Callback for editing
  onDelete: (id: string) => void; // Callback for deleting
  renderContent: (item: T) => string; // Function to render the main content of each item
  renderAdditionalContent?: (item: T) => JSX.Element; // Optional: Additional JSX for each item
}

const Accordion = <T extends { id: string }>({
  title,
  data,
  onEdit,
  onDelete,
  renderContent,
}: // renderAdditionalContent,
AccordionProps<T>) => {
  // const dispatch: AppDispatch = useDispatch();
  const { theme } = useTheme();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Track container state
  const [activeEditId, setActiveEditId] = useState<string | null>(null); // Track active edit ID
  const [updatedValue, setUpdatedValue] = useState<string>(""); // Updated value for editing

  const toggleAccordionContainer = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const handleEditClick = (id: string, currentValue: string) => {
    setActiveEditId(id);
    setUpdatedValue(currentValue); // Pre-fill input with the current value
  };

  const handleSaveClick = () => {
    if (activeEditId) {
      onEdit(activeEditId, updatedValue);
      setActiveEditId(null);
      setUpdatedValue("");
    }
  };

  const handleCancelEdit = () => {
    setActiveEditId(null);
    setUpdatedValue("");
  };

  return (
    <div className="accordion-wrapper">
      <div>
        <div className="accordion">
          <div className="accordion-header" onClick={toggleAccordionContainer}>
            <h2>{title}</h2>
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
                <div>Header</div>
                <div>Actions</div>
              </div>
              {data.map((item) => (
                <div key={item.id} className="accordion-table-row">
                  <div>{renderContent(item)}</div>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEditClick(item.id, renderContent(item))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(item.id)}
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
            <h3>Edit Section</h3>
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
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
  );
};

export default Accordion;
