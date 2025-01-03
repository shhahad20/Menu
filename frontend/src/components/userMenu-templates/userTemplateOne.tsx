import { useEffect, useState } from "react";
import "../../styles/menus-style/template1.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenuTemplateById,
  TemplateItem,
} from "../../redux/menu/menuSlice";
import { useParams } from "react-router-dom";


const UserTemplate1 =() => {
    const { templateId } = useParams<{ templateId: string }>();

  const { currentTemplate } = useSelector((state: RootState) => state.menu);
  const dispatch: AppDispatch = useDispatch();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
 
  // Fetch data on component mount
  useEffect(() => {
    if(templateId){
    dispatch(fetchMenuTemplateById(templateId));}
  }, [dispatch,templateId]);

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

  return (
    <div className="menu-container">
      <div className="menu-navbar">
        <ul className="ul-container">
          <li>Menu</li>
          <li>Offers</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="menu-top-container">
        <div className="top-item">
          <div className="news-container">
            <h1>TODAY’S MOOD IS SPONSORED BY COFFEE</h1>
            <p>Try our NEW Coffee Latte</p>
          </div>
        </div>
        <div className="top-item top-img">
          <img
            className="menu-img"
            src="https://cdacqfsioxqvhkvqsxjs.supabase.co/storage/v1/object/public/menu_images/menuTemplates/template1/temp1img.svg?t=2024-12-21T11%3A13%3A09.724Z"
            alt=""
          />
        </div>
      </div>

      <div className="menu-bottom-container">
        <div className="t1-bottom-container">
          {templateSections.length > 0 && (
            <>
              <div className="arrows">
                <button className="arrow-button left" onClick={handlePrevious}>
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
    </div>
  );
};

export default UserTemplate1;
