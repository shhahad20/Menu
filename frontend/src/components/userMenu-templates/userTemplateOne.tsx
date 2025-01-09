import { useEffect, useState } from "react";
import "../../styles/menus-style/template1.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompData,
  fetchMenuTemplateById,
  TemplateItem,
} from "../../redux/menu/menuSlice";
import { useParams } from "react-router-dom";
import EditMenuForm from "../dashboard/EditMenuForm";

const UserTemplate1 = () => {
  const { componentId } = useParams<{ componentId: string }>(); // Fetch componentId from route params

  const { currentTemplate, components } = useSelector(
    (state: RootState) => state.menu
  );
  const dispatch: AppDispatch = useDispatch();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Fetch component data using componentId
  useEffect(() => {
    if (componentId) {
      dispatch(fetchCompData(componentId)); // Fetch component data by componentId
    }
  }, [dispatch, componentId]);

  // After fetching the component, fetch the related template using the template_id from the component
  useEffect(() => {
    if (components.length > 0) {
      const templateId = components[0].template_id; // Assuming template_id is part of the component data
      if (templateId) {
        dispatch(fetchMenuTemplateById(templateId)); // Fetch template by templateId
      }
    }
  }, [dispatch, components]);

  
  const templateSections = currentTemplate?.template_sections || [];

  const handlePrevious = () => {
    setCurrentSectionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : templateSections.length - 1
    );
  };

  const handleNext = () => {
    setCurrentSectionIndex((prevIndex) =>
      prevIndex < templateSections.length - 1 ? prevIndex + 1 : 0
    );
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);

  
  return (
    <div className="menu-container">
      <div className="menu-navbar">
        <ul className="ul-container">
          {/* Assuming navbar is a comma-separated string */}
          {components.map((component) =>
            component.navbar.split(",").map(
              (navItem, index) => <li key={index}>{navItem.trim()}</li>
            )
          )}
        </ul>
      </div>

      <button className="edit-button" onClick={toggleEditMode}>
        {editMode ? "View Mode" : "Edit Menu"}
      </button>

      {editMode ? (
        <EditMenuForm />
      ) : (
        <>
          <div className="menu-top-container">
            <div className="top-item">
              {components.map((component) => (
                <div className="news-container" key={component.id}>
                  <h1>{component.header}</h1>
                  <p>{component.slogan}</p>
                </div>
              ))}
            </div>
            {components.map((component) => (
              <div className="top-item top-img" key={component.id}>
                <img
                  className="menu-img"
                  src={
                    typeof component.header_img === "string"
                      ? component.header_img
                      : component.header_img instanceof File
                      ? URL.createObjectURL(component.header_img)
                      : "https://cdacqfsioxqvhkvqsxjs.supabase.co/storage/v1/object/public/menu_images/menuTemplates/template1/temp1img.svg?t=2024-12-21T11%3A13%3A09.724Z"
                  }
                  alt=""
                />
              </div>
            ))}
          </div>

          <div className="menu-bottom-container">
            <div className="t1-bottom-container">
              {templateSections.length > 0 && (
                <>
                  <div className="arrows">
                    <button
                      className="arrow-button left"
                      onClick={handlePrevious}
                    >
                      <img
                        src="https://cdacqfsioxqvhkvqsxjs.supabase.co/storage/v1/object/public/menu_images/menuTemplates/template1/left-arow.svg?t=2024-12-21T11%3A08%3A34.543Z"
                        alt="Left Arrow"
                      />
                    </button>
                  </div>

                  <div className="temp1-list-container">
                    <h1 className="t1-list-header">
                      {templateSections[currentSectionIndex]?.header || ""}
                    </h1>
                    <div className="t1-list-items">
                      {templateSections[currentSectionIndex]?.template_items?.map(
                        (item: TemplateItem, index: number) => (
                          <div className="t1-item" key={index}>
                            <div className="t1-item-content">
                              <h2>{item.title}</h2>
                              <p>{item.description}</p>
                            </div>
                            <p className="t1-price">{item.price} SAR</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="arrows">
                    <button className="arrow-button right" onClick={handleNext}>
                      <img
                        src="https://cdacqfsioxqvhkvqsxjs.supabase.co/storage/v1/object/public/menu_images/menuTemplates/template1/arow-right.svg?t=2024-12-21T11%3A08%3A24.596Z"
                        alt="Right Arrow"
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <footer className="t1-footer">
            <p>Powered by MenuCraft</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default UserTemplate1;
