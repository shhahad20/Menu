import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import {
  clearCurrentTemplate,
  copyMenuTemplate,
  updateMenuTemplate,
} from "../redux/menu/menuSlice";
import '../styles/dashboard-elements/menuEditing.scss';
const CopyAndEditTemplatePage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>(); // Get templateId from route params
  const dispatch = useDispatch<AppDispatch>();
  const { currentTemplate, loading, error } = useSelector(
    (state: RootState) => state.menu
  );

  const [isSaving, setIsSaving] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(currentTemplate);

  // Handle Copy and Load Template
  useEffect(() => {
    const handleCopyTemplate = async () => {
      if (templateId) {
        await dispatch(copyMenuTemplate(templateId));
      }
    };

    handleCopyTemplate();
    // Cleanup to clear currentTemplate when leaving the page
    return () => {
      dispatch(clearCurrentTemplate());
    };
  }, [dispatch, templateId]);

  // Update local editing state when currentTemplate changes
  useEffect(() => {
    if (currentTemplate) {
      setEditingTemplate(currentTemplate);
    }
  }, [currentTemplate]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        [field]: value,
      });
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (editingTemplate) {
      setIsSaving(true);
      try {
        await dispatch(updateMenuTemplate(editingTemplate));
        alert("Template saved successfully!");
      } catch (err) {
        console.error("Failed to save changes:", err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (loading || !editingTemplate) return <p>Loading template...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="menu-edting-section">
      <h1>Edit Template</h1>
      <div>
        <label>
          Name:
          <input
          className="name-input"
            type="text"
            value={editingTemplate.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </label>

        {/* Example: Rendering sections and items */}
        {editingTemplate.template_sections.map((section, sectionIndex) => (
          <div key={section.section_id}>
            <h2>
              Section {sectionIndex + 1}:{" "}
              <input
                type="text"
                value={section.header}
                onChange={(e) =>
                  setEditingTemplate((prev) => {
                    if (!prev) return prev;
                    const sections = [...prev.template_sections];
                    sections[sectionIndex].header = e.target.value;
                    return { ...prev, template_sections: sections };
                  })
                }
              />
            </h2>
            <ul>
              {section.template_items.map((item, itemIndex) => (
                <li key={item.item_id}>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      setEditingTemplate((prev) => {
                        if (!prev) return prev;
                        const sections = [...prev.template_sections];
                        sections[sectionIndex].template_items[itemIndex].title =
                          e.target.value;
                        return { ...prev, template_sections: sections };
                      })
                    }
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) =>
                      setEditingTemplate((prev) => {
                        if (!prev) return prev;
                        const sections = [...prev.template_sections];
                        sections[sectionIndex].template_items[itemIndex].price =
                          e.target.value;
                        return { ...prev, template_sections: sections };
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CopyAndEditTemplatePage;
