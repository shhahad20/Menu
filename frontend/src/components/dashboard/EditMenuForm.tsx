import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMenuTemplateById } from "../../redux/menu/menuSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../../styles/dashboard-elements/editeMenuForm.scss";
import DashboardHeader from "./DashboardHeader";
import Footer from "../Footer";
import { createItem, removeItem, updateItem } from "../../redux/menu/itemSlice";
const EditMenuForm = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const currentTemplate = useSelector(
    (state: RootState) => state.menu.currentTemplate
  );
  const [selectedSection, setSection] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // To track editing state

  const [formData, setFormData] = useState({
    name: "",
    template_sections: [] as {
      section_id: string;
      header: string;
      template_items: {
        item_id: string;
        title: string;
        description: string;
        price: string;
      }[];
    }[],
  });
  const [newItem, setNewItem] = useState({
    item_id: editingItemId ||'',
    templateId: templateId,
    section_id: selectedSection,
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (templateId) {
      dispatch(fetchMenuTemplateById(templateId));
    }
  }, [dispatch, templateId]);
  useEffect(() => {
    if (currentTemplate) {
      setFormData({
        name: currentTemplate.name || "",
        template_sections: currentTemplate.template_sections || [],
      });
    }
  }, [currentTemplate]);

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
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
    console.log("Editing item:", item_id);
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
        templateId: templateId || "",
        section_id: selectedSection?.section_id || "",
        title: selectedItem.title,
        price: selectedItem.price,
        description: selectedItem.description,
      });
    }
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
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (templateId) {
  //     try {
  //       await dispatch(updateMenuTemplate({ id: templateId, data: formData }));
  //       alert("Menu template updated successfully!");
  //     } catch (error) {
  //       console.error("Failed to update menu template:", error);
  //       alert("Failed to update menu template. Please try again.");
  //     }
  //   }
  // };


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

  return (
    <>
      <DashboardHeader />

      <div className="edit-menu-form-section">
        <div id="edit-menu-form-conatiner">
          <form onSubmit={handleCreateOrUpdateItem}>
            <div className="">
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
        </div>
        <div className="lists-conatiner">
          <ul role="list" className="items-lists">
            {formData.template_sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="item-section-container">
                {/* <h2 className="font-bold text-lg mb-2">{section.header}</h2> */}
                {section.template_items.map((item, itemIndex) => (
                  <li key={`${sectionIndex}-${itemIndex}`} className="">
                    <div className="item-container">
                      <div className="item">
                        {/* {item.imageUrl && (
                  <img
                    alt=""
                    src={item.imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                )} */}
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
                        <button onClick={() => handleEditClick(item.item_id)}>Edit</button>
                        <button onClick={() => handleDeleteItem(item.item_id)}>
                          🗑
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditMenuForm;
