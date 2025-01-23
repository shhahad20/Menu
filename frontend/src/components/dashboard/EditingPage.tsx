import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import {
  fetchCompData,
  fetchMenuTemplateById,
  updateMenuComp,
  updateMenuTemplate,
} from "../../redux/menu/menuSlice";
import "../../styles/dashboard-elements/editingPage.scss";
import { useTheme } from "../../context/ThemeContext";
import {
  createSection,
  fetchSectionsForTemplate,
  removeSection,
  Section,
} from "../../redux/menu/sectionSlice";
import SectionsAccordion from "../ui/SectionAccordion";
const EditingPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { theme } = useTheme();

  const { currentTemplate, component } = useSelector(
    (state: RootState) => state.menu
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Track container state
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [updatedSectionName, setUpdatedSectionName] = useState("");
  const { sections } = useSelector((state: RootState) => state.sections);
  const [templateName, setTemplateName] = useState(currentTemplate?.name || "");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const com_id = currentTemplate?.component_id;
  const [componentData, setComponentData] = useState<{
    id: string | undefined;
    template_id: string | undefined;
    header: string;
    header_img: string | File;
    logo: string | File;
    slogan: string;
    navbar: string;
    contact_info: string;
  }>({
    id: currentTemplate?.component_id,
    template_id: currentTemplate?.id,
    header: "",
    header_img: "",
    logo: "",
    slogan: "",
    navbar: "",
    contact_info: "",
  });
  // const [sections, setSections] = useState<Section[]>([]);
  const [newSection, setNewSection] = useState({
    section_id: currentTemplate?.template_sections || "",
    template_id: id,
    header: "",
    section_order: "0",
  });
  const [imagePreview, setImagePreview] = useState<string>(
    typeof component?.header_img === "string" ? component.header_img : ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<boolean>(false); // Track error state

  useEffect(() => {
    // Reset states when component or imagePreview changes
    if (component?.header_img) {
      setImagePreview(component.header_img as string);
      setIsLoading(true);
      setError(false);
    }
  }, [component]);

  const handleImageLoad = () => {
    setIsLoading(false); // Image successfully loaded
  };

  const handleImageError = () => {
    setIsLoading(false); // Stop loading
    setError(true); // Mark as an error
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file);

      setComponentData((prev) => ({
        ...prev,
        header_img: file,
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Prevent adding more than 4 tags
      if (tags.length < 4) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      } else {
        alert("You can only add up to 4 items in the navbar.");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchMenuTemplateById(id));
      dispatch(fetchSectionsForTemplate(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (com_id) {
      try {
        dispatch(fetchCompData(com_id));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, com_id]);

  useEffect(() => {
    if (currentTemplate?.name) {
      setTemplateName(currentTemplate.name);
    }
  }, [currentTemplate]);
  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchSectionsForTemplate(id))
  //   }
  // }, [dispatch,id]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTemplateName(value);
  };
  const handleCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setComponentData((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : value,
    }));
  };
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSection((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateOrUpdateSection = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(
          createSection({ template_id: id, header: newSection.header })
        );
        // alert("Section successfully updated/created!");

        // Reset newSection state
        setNewSection({
          section_id: currentTemplate?.template_sections || "",
          template_id: id,
          header: "",
          section_order: "0",
        });
      } else {
        alert("Incorrect id!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create/update section.");
    }
  };
  const handleMenuName = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(updateMenuTemplate({ id: id, name: templateName }));
      } else {
        alert("Incorrect id!");
      }
      alert("Successfully updated the menu");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update menu.");
    }
  };
  const handleMenuChanges = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const filteredData = Object.fromEntries(
      Object.entries(componentData).filter(([key, value]) => {
        // Keep only fields that are not empty
        if (Array.isArray(value)) return value.length > 0; // Keep non-empty arrays
        return value !== "" && value !== undefined; // Exclude empty strings or undefined
      })
    );
    const updatedNavbar = tags.join(",");
    if (updatedNavbar.trim() !== "") {
      filteredData.navbar = updatedNavbar;
    }
    for (const [key, value] of Object.entries(filteredData)) {
      if (key === "header_img" && value instanceof File) {
        // If it's a file, append it as a file field
        formData.append("image_url", value);
      } else {
        // For other fields, append as a regular text field
        formData.append(key, value);
      }
    }
    try {
      if (currentTemplate?.component_id) {
        await dispatch(
          updateMenuComp({
            id: currentTemplate.component_id,
            data: formData,
          })
        );
        alert("Successfully updated the menu");
      } else {
        alert("Incorrect id!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update menu.");
    }
  };

  // const handleEditClick = (section: Section) => {
  //   setActiveEditId(section.section_id);
  //   setUpdatedSectionName(section.header); // Pre-fill with current name
  // };
  // const toggleAccordionContainer = () => {
  //   setIsAccordionOpen((prevState) => !prevState); // Toggle open/close state
  // };
  // const handleSaveClick = (sectionId: string) => {
  //   // handleUpdate(sectionId, updatedSectionName);
  //   setActiveEditId(null); // Close the input field after saving
  // };
  // const handleDeleteSection = (sectionId: string) => {
  //   dispatch(removeSection(sectionId));
  // };
  return (
    <div className="editing-container">
      <div className="top-edit-page-header">
        <h1>Edit Menu</h1>
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 20h9"></path>
          <path
            d="M7.5 6.875V10M7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125ZM7.53113 5V5.0625L7.46887 5.06262V5H7.53113Z"
            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <form action="" onSubmit={handleMenuName} className="template-form">
        <div className="edit-menu-container">
          <div className="input-label-container">
            <label htmlFor="menu_name" className="label template-name">
              Menu Name
            </label>
            <input
              className="editing-input"
              type="text"
              id="menu_name"
              name="header"
              value={templateName}
              onChange={handleTemplateChange}
            />
            <button type="submit" className="submit-btn">
              Update
            </button>
          </div>
          <div className="error-area">*error</div>
        </div>
      </form>
      <div className="divider"></div>
      <form action="" onSubmit={handleMenuChanges} className="component-form">
        <div className="edit-menu-container">
          <div className="input-label-container">
            <label htmlFor="menu_name" className="label component-image">
              Header Image
            </label>
            <div className="image-warpper">
              <div className="image-container">
                <div className="image-holder">
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && error && <p>Failed to load image</p>}
                  {imagePreview && !error ? (
                    <img
                      src={imagePreview}
                      alt="Header Preview"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  ) : (
                    !isLoading && !imagePreview && <p>No image available</p>
                  )}
                </div>
                <div className="file-upload-wrapper">
                  <label className="file-upload-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="upload-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                    Upload a file
                    <input
                      type="file"
                      className="hidden-file-input"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="image-rules">
              <p>
                Only images with type (jpeg, png, jpg) are allowed. The size of
                the image should be xxx x xxx
              </p>
            </div>
            <div className="input-label-container">
              <label htmlFor="menu_name" className="label">
                Menu Header
              </label>
              <input
                className="editing-input"
                type="text"
                id="menu_name"
                name="header"
                placeholder="Max 250 characters"
                onChange={handleCompChange}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="menu_name" className="label">
                Solgan
              </label>
              <input
                className="editing-input"
                type="text"
                id="menu_name"
                name="slogan"
                placeholder="Max 250 characters"
                onChange={handleCompChange}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="tags-input" className="label tag-label ">
                Navbar
              </label>
              <div className="tag-wrapper">
                {tags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      className="remove-tag-button"
                      onClick={() => handleRemoveTag(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  id="tags-input"
                  value={inputValue}
                  name="navbar"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    tags.length === 0
                      ? "Type and press Enter, maximum 4 tags."
                      : ""
                  }
                  className="tag-input"
                  disabled={tags.length >= 4}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </div>
          <div className="error-area">*error</div>
        </div>
      </form>

      <div className="divider"></div>
      <div className="top-edit-page-header">
        <h1>Add New Section</h1>
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 20h9"></path>
          <path
            d="M7.5 6.875V10M7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125ZM7.53113 5V5.0625L7.46887 5.06262V5H7.53113Z"
            stroke={theme === "dark" ? "#D9D9D9" : "#757575"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <form
        action=""
        onSubmit={handleCreateOrUpdateSection}
        className="template-form"
      >
        <div className="edit-menu-container">
          <div className="input-label-container">
            <label htmlFor="menu_name" className="label template-name">
              Section Name
            </label>
            <input
              className="editing-input"
              type="text"
              id="menu_name"
              name="header"
              placeholder="Max 250 characters"
              onChange={handleSectionChange}
            />
            <button type="submit" className="submit-btn">
              Add Section
            </button>
            {/* <div className="input-label-container">
              <label htmlFor="menu_name" className="">
                Sections
              </label>
              <select name="template-sections" className="editing-input">
                {sections
                  .filter((section) => section.section_id && section.header)
                  .map((section) => (
                    <option
                      key={section.section_id}
                      value={section.section_id}
                      className="section-option"
                    >
                      {section.header}
                    </option>
                  ))}
              </select>
            </div> */}
            {/* <div className="input-label-container">
              <label htmlFor="menu_name" className="label">
                Update Section Name
              </label>
              <input
                className="editing-input"
                type="text"
                id="menu_name"
                name="header"
                placeholder="Max 250 characters"
                onChange={handleCompChange}
              />
              <button type="submit" className="submit-btn">
                Update Section
              </button>
            </div> */}
          </div>
          <div className="error-area">*error</div>
        </div>
      </form>
      <SectionsAccordion templateId={id} />
    </div>
  );
};

export default EditingPage;
