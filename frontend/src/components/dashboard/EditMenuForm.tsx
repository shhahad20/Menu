import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCompData,
  fetchMenuTemplateById,
  updateMenuComp,
} from "../../redux/menu/menuSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../../styles/dashboard-elements/editeMenuForm.scss";
import { createItem, removeItem, updateItem } from "../../redux/menu/itemSlice";
import {
  createSection,
  fetchSectionById,
  removeSection,
  updateSection,
} from "../../redux/menu/sectionSlice";
const EditMenuForm = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { currentTemplate, components } = useSelector(
    (state: RootState) => state.menu
  );
  const [selectedSection, setSection] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null); // To track editing state
  const [isLoading, setIsLoading] = useState(false);

  const [viewMode, setViewMode] = useState<"items" | "sections">("items");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleViewChange = (mode: "items" | "sections") => {
    setViewMode(mode);
  };

  const [compData, setCompData] = useState<{
    id: string | undefined;
    template_id: string;
    header: string;
    header_img: string | File;
    logo: string | File;
    slogan: string;
    navbar: string;
    contact_info: [];
  }>({
    id: componentId,
    template_id: "",
    header: "",
    header_img: "", // Default to an empty string
    logo: "", // Default to an empty string
    slogan: "",
    navbar: "",
    contact_info: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    template_sections: [] as {
      section_id: string;
      header: string;
      section_order: string;
      template_id: string;
      template_items: {
        item_id: string;
        title: string;
        description: string;
        price: string;
      }[];
    }[],
  });
  const [newItem, setNewItem] = useState({
    item_id: editingItemId || "",
    template_id: components[0].template_id,
    section_id: selectedSection,
    title: "",
    price: "",
    description: "",
  });

  const [newSection, setNewSection] = useState({
    section_id: editingSectionId || "",
    template_id: components[0].template_id || "",
    header: "",
    section_order: "0",
  });
  useEffect(() => {
    const currentComponent = components.find((comp) => comp.id === componentId);

    if (currentComponent) {
      setCompData({
        id: currentComponent.id,
        template_id: currentComponent.template_id || "",
        header: currentComponent.header || "",
        header_img: currentComponent.header_img || "",
        logo: currentComponent.logo || "",
        slogan: currentComponent.slogan || "",
        navbar: currentComponent.navbar || "",
        contact_info: currentComponent.contact_info || [],
      });
    }
  }, [componentId, components]);
  useEffect(() => {
    if (componentId) {
      dispatch(fetchCompData(componentId));
    }
  }, [dispatch, componentId]);

  useEffect(() => {
    if (components.length > 0) {
      const templateId = components[0].template_id;
      if (templateId) {
        dispatch(fetchMenuTemplateById(templateId));
      }
      const sections = currentTemplate?.template_sections || [];
      setFormData((prev) => ({
        ...prev,
        template_sections: sections,
      }));
    }
  }, [dispatch, components]);

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSection((prev) => ({ ...prev, [name]: value }));
  };
  const handleCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setCompData((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : value,
    }));
  };
  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const sectionValue = event.target.value;
    setSection(sectionValue);
    setNewItem((prevProduct) => ({
      ...prevProduct,
      section_id: sectionValue,
    }));
  };
  const handleEditClick = (item_id: string) => {
    setEditingItemId(item_id);
    const selectedSection = formData.template_sections.find((section) =>
      section.template_items.some((item) => item.item_id === item_id)
    );
    const selectedItem = selectedSection?.template_items.find(
      (item) => item.item_id === item_id
    );
    if (selectedItem) {
      setNewItem({
        item_id: item_id,
        template_id: components[0].template_id || "",
        section_id: selectedSection?.section_id || "",
        title: selectedItem.title,
        price: selectedItem.price,
        description: selectedItem.description,
      });
    }
  };
  const handleSectionEditClick = (section_id: string) => {
    setEditingSectionId(section_id);
    // Dispatch the fetchSectionById thunk to load the section data
    dispatch(fetchSectionById(section_id))
      .unwrap()
      .then((selectedSection) => {
        // If the section is found, update the state with its details
        setNewSection({
          section_id: selectedSection.section_id,
          header: selectedSection.header,
          section_order: selectedSection.section_order || 0, // Provide default value if undefined
          template_id: selectedSection.template_id || "", // Provide default value if undefined
        });
      })
      .catch((error) => {
        console.error("Failed to fetch section:", error);
      });
  };
  const handleCreateOrUpdateItem = async (event: FormEvent) => {
    event.preventDefault();
    const itemFormData = new FormData();
    itemFormData.append("title", newItem.title);
    itemFormData.append("description", newItem.description);
    itemFormData.append("price", newItem.price);
    itemFormData.append("section_id", newItem.section_id);

    try {
      if (editingItemId) {
        itemFormData.append("item_id", editingItemId);
        await dispatch(updateItem(itemFormData)).unwrap();
        alert("Item updated successfully!");
      } else {
        await dispatch(createItem(itemFormData)).unwrap();
        alert("Item created successfully!");
      }
      setEditingItemId(null);
      // Reset form state
      setNewItem({
        item_id: editingItemId || "",
        template_id: components[0].template_id,
        section_id: selectedSection,
        title: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating/creating item:", error);
      alert("Failed to update/create item.");
    }
  };

  const handleCreateOrUpdateSection = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Dispatch your actions here
      if (editingSectionId) {
        await dispatch(updateSection(newSection)).unwrap();
      } else {
        await dispatch(createSection(newSection)).unwrap();
      }
      alert("Section successfully updated/created!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create/update section.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateOrUpdateMenu = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // Dispatch your actions here
      if (componentId) {
        await dispatch(updateMenuComp({ id: componentId, data: compData }));
        await dispatch(fetchCompData(componentId));
      } else {
        alert("Incorrect component id!");
      }
      alert("Successfully updated the menu");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update menu.");
    }
  };
  const handleDeleteItem = (itemId: string) => {
    // Optimistically update the local state
    const updatedSections = formData.template_sections.map((section) => ({
      ...section,
      template_items: section.template_items.filter(
        (item) => item.item_id !== itemId
      ),
    }));
    setFormData((prev) => ({ ...prev, template_sections: updatedSections }));

    // Dispatch the Redux action to remove the item
    dispatch(removeItem(itemId));
  };
  const handleDeleteSection = (sectionId: string) => {
    // Optimistically update the local state to remove the section
    const updatedSections = formData.template_sections.filter(
      (section) => section.section_id !== sectionId
    );

    setFormData((prev) => ({ ...prev, template_sections: updatedSections }));

    // Dispatch the Redux action to remove the section
    dispatch(removeSection(sectionId))
      .unwrap()
      .then(() => {
        console.log("Section deleted successfully.");
      })
      .catch((error) => {
        console.error("Failed to delete section:", error);
        // Optionally, you could revert the optimistic update here
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("Selected file:", file);
    }
  };

  return (
    <>
      <div className="edit-menu-form-section">
        <div id="edit-menu-form-conatiner">
          <form onSubmit={handleCreateOrUpdateMenu}>
            <div className="form-s-container">
              <h1 className="forms-header">Menu</h1>
              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Header
                </label>
                <input
                  className=""
                  type="text"
                  id="menu_name"
                  name="header"
                  value={compData.header}
                  onChange={handleCompChange}
                />
              </div>
              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Slogan
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="slogan"
                  value={compData.slogan}
                  onChange={handleCompChange}
                />
              </div>
              <div className="tag-input-container">
                <label htmlFor="tags-input" className="tag-label">
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
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press Enter"
                    className="tag-input"
                  />
                </div>
              </div>
              {/* <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Navbar
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="navbar"
                  value={compData.navbar}
                  onChange={handleCompChange}
                />
              </div> */}
              {/* <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Image
                </label>
                <input
                  type="file"
                  id="menu_name"
                  name="header_img"
                  onChange={handleCompChange}
                />
              </div> */}
              <div className="file-upload-wrapper">
                <label htmlFor="">Header Image</label>
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
            <button type="submit" className="sub-button">
              Submit
            </button>
          </form>

          <form onSubmit={handleCreateOrUpdateItem}>
            <div className="form-s-container">
              <h1 className="forms-header">Items</h1>
              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Title
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="title"
                  value={newItem.title}
                  onChange={handleItemChange}
                />
              </div>

              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Description
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="description"
                  value={newItem.description}
                  onChange={handleItemChange}
                />
              </div>

              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Price
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="price"
                  value={newItem.price}
                  onChange={handleItemChange}
                />
              </div>

              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Sections
                </label>
                <select name="categories" onChange={handleOptions}>
                  {formData.template_sections
                    .filter((section) => section.section_id && section.header)
                    .map((section) => (
                      <option
                        key={section.section_id}
                        value={section.section_id}
                      >
                        {section.header}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button type="submit" className="sub-button">
              Submit
            </button>
          </form>

          <form onSubmit={handleCreateOrUpdateSection}>
            <div className="form-s-container">
              <h1 className="forms-header">Section</h1>
              <div className="input-label-container">
                <label htmlFor="menu_name" className="">
                  Header
                </label>
                <input
                  type="text"
                  id="menu_name"
                  name="header"
                  value={newSection.header}
                  onChange={handleSectionChange}
                />
              </div>
            </div>
            <button type="submit" className="sub-button" disabled={isLoading}>
              {isLoading ? "Saving..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="lists-conatiner">
          <div className="toggle-container">
            <button
              onClick={() => handleViewChange("items")}
              className={`toggle-button ${
                viewMode === "items" ? "active" : ""
              }`}
            >
              Show Items
            </button>
            <button
              onClick={() => handleViewChange("sections")}
              className={`toggle-button ${
                viewMode === "sections" ? "active" : ""
              }`}
            >
              Show Sections
            </button>
          </div>

          <ul role="list" className="items-lists">
            {viewMode === "items" &&
              formData.template_sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="item-section-container">
                  {section.template_items.map((item, itemIndex) => (
                    <li
                      key={`${sectionIndex}-${itemIndex}`}
                      className="item-list"
                    >
                      <div className="item-container">
                        <div className="item">
                          <div className="">
                            <p className="it-title">{item.title}</p>
                            <p className="it-description">{item.description}</p>
                            <p className="sec-header">
                              Section: {section.header}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="it-price">{item.price} SAR</p>
                        </div>
                        <div className="buttons-container">
                          <button onClick={() => handleEditClick(item.item_id)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.item_id)}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              ))}

            {viewMode === "sections" &&
              formData.template_sections.map((section, sectionIndex) => (
                <li key={`section-${sectionIndex}`} className="item-list">
                  <div className="item-container">
                    <div className="item">
                      <h2>{section.header}</h2>
                    </div>
                    <div className="buttons-container">
                      <button
                        onClick={() =>
                          handleSectionEditClick(section.section_id)
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.section_id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EditMenuForm;
