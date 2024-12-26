import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import {
  clearCurrentTemplate,
  copyMenuTemplate,
  TemplateItem,
  TemplateSection,
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
    // const handleCopyTemplate = async () => {
      if (templateId) {
         dispatch(copyMenuTemplate(templateId));
      }
    // };

    // handleCopyTemplate();
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

// Handle template name and section updates
const handleInputChange = (field: string, value: string) => {
  setEditingTemplate((prev) => {
    if (!prev) return prev; // If prev is null, return it as is
    return {
      ...prev,
      [field]: value,
    };
  });
};


const handleSectionChange = (
  sectionIndex: number,
  key: keyof TemplateSection,
  value: string
) => {
  setEditingTemplate((prev) => {
    if (!prev) return prev;
    const updatedSections = [...prev.template_sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [key]: value,
    };
    return { ...prev, template_sections: updatedSections };
  });
};

const handleItemChange = (
  sectionIndex: number,
  itemIndex: number,
  key: keyof TemplateItem,
  value: string
) => {
  setEditingTemplate((prev) => {
    if (!prev) return prev;

    // Create a deep copy of the section and items to ensure immutability
    const updatedSections = prev.template_sections.map((section, idx) => {
      if (idx !== sectionIndex) return section;

      return {
        ...section,
        template_items: section.template_items.map((item, iIdx) => {
          if (iIdx !== itemIndex) return item;
          return { ...item, [key]: value };
        }),
      };
    });

    return { ...prev, template_sections: updatedSections };
  });
};


// Save changes to the template
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
    <div className="menu-editing-section">
      <h1>Edit Template</h1>
      <div className="template-editor">
        {/* Template Name */}
        <div className="template-field">
          <label>Template Name:</label>
          <input
            type="text"
            value={editingTemplate.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Sections and Items */}
        {editingTemplate.template_sections.map((section, sectionIndex) => (
          <div className="section-editor" key={section.section_id}>
            <h2>Section {sectionIndex + 1}</h2>
            <input
              type="text"
              value={section.header}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "header", e.target.value)
              }
              placeholder="Section Header"
            />

            <div className="items-editor">
              {section.template_items.map((item, itemIndex) => (
                <div className="item-editor" key={item.item_id}>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        itemIndex,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Item Title"
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        itemIndex,
                        "price",
                        e.target.value
                      )
                    }
                    placeholder="Item Price"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        itemIndex,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Item Description"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button
          className="save-button"
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CopyAndEditTemplatePage;
