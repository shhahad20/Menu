import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCompData, fetchMenuTemplateById } from "../../redux/menu/menuSlice";
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
  const {currentTemplate, components} = useSelector(
    (state: RootState) => state.menu
  );
  const [selectedSection, setSection] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null); // To track editing state

  const [viewMode, setViewMode] = useState<"items" | "sections">("items");

  const handleViewChange = (mode: "items" | "sections") => {
    setViewMode(mode);
  };

  const [compData, setcompData] = useState({
    id: componentId,
    template_id: "",
    header: "",
    header_img : "" ,
    logo: ""  ,
    slogan: "",
    navbar:"",
    contact_info:[],
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
      const sections = currentTemplate?.template_sections || [] ;
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
        // Update existing item
        itemFormData.append("item_id", editingItemId);
        await dispatch(updateItem(itemFormData));
        alert("Item updated successfully!");
      } else {
        // Create a new item
        await dispatch(createItem(itemFormData));
        alert("Item created successfully!");
      }
      setEditingItemId(null); // Reset editing state
      // setNewItem({
      //   templateId: templateId,
      //   section_id: "",
      //   title: "",
      //   price: "",
      //   description: "",
      // }); // Reset form
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateSection = async (event: FormEvent) => {
    event.preventDefault();
  
    // const sectionFormData = new FormData();

    try {
      if (editingSectionId) {
        // Update existing section
        // sectionFormData.append("template_id", newSection.template_id);
        // sectionFormData.append("header", newSection.header);
        // sectionFormData.append("section_id", editingSectionId);
        console.log("section order "+ newSection.section_order)
        await dispatch(updateSection({section_id:newSection.section_id, header:newSection.header}));
        alert("Section updated successfully!");
      } else {
        // Create new section
        await dispatch(createSection({template_id:newSection.template_id,header:newSection.header}));
        alert("Section created successfully!");
      }
      // Reset form state after submission
      // setNewSection({
      //   section_id: "",
      //   template_id: templateId || "",
      //   header: "",
      //   section_order: "0",
      // });
    } catch (error) {
      console.error("Failed to create or update section:", error);
      alert("An error occurred while creating/updating the section");
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
  console.log('Dispatching fetchCompData with componentId:', componentId);
  console.log('Current template:', currentTemplate);
  console.log('Components:', components);
  return (
    <>
      <div className="edit-menu-form-section">
        <div id="edit-menu-form-conatiner">
          <form onSubmit={handleCreateOrUpdateItem}>
            <div className="">
              <h1>Items</h1>
              <div>
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

              <div>
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

              <div>
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

              <div>
                <label htmlFor="menu_name" className="">
                  Category
                </label>
                <select name="categories" onChange={handleOptions}>
                  {formData.template_sections.map((section) => (
                    <option key={section.section_id} value={section.section_id}>
                      {section.header}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>

          <form onSubmit={handleCreateOrUpdateSection}>
            <div className="">
              <h1>Section</h1>
              <div>
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
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
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
