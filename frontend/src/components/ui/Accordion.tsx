import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

import "../../styles/ui/accordion.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface AccordionProps<T> {
  title: string; // Title of the accordion
  data: T[]; // Generic data array
  onEdit: (id: string, updatedValue: string) => void; // Callback for editing
  onDelete: (id: string) => void; // Callback for deleting
  renderContent: (item: T) => string; // Function to render the main content of each item
  renderAdditionalContent?: (item: T) => JSX.Element;
  headers?: string[]; // Optional: Custom headers for the table
  actions?: (item: T) => JSX.Element;
  renderEditComponent?: (
    id: string,
    value: string,
    onSave: () => void,
    onCancel: () => void,
    onChange: (value: string) => void
  ) => JSX.Element;
}

const Accordion = <T extends { id: string }>({
  title,
  data,
  onEdit,
  onDelete,
  renderContent,
  headers = ["Header", "Actions"], // Default headers
  actions,
  renderEditComponent,
}: // renderAdditionalContent,
AccordionProps<T>) => {
  // const dispatch: AppDispatch = useDispatch();
  const { theme } = useTheme();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Track container state
  const [activeEditId, setActiveEditId] = useState<string | null>(null); // Track active edit ID
  const [updatedValue, setUpdatedValue] = useState<string>(""); // Updated value for editing
  const { sections } = useSelector((state: RootState) => state.sections);
  const { items } = useSelector((state: RootState) => state.items);

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
      <div className="acc-container">
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
                {headers.map((header, index) => (
                  <div key={index}>{header}</div>
                ))}
              </div>
              {items.map((item) => (
                <div key={item.item_id} className="accordion-table-row">
                  <div></div>
                  <div className="actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEditClick(item.item_id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => onDelete(item.item_id)}
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
            {renderEditComponent ? (
              renderEditComponent(
                activeEditId,
                updatedValue,
                handleSaveClick,
                handleCancelEdit,
                setUpdatedValue
              )
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
