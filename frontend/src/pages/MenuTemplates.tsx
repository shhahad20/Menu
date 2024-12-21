import React from "react";
import "../styles/menus.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const MenusTemplates: React.FC = () => {
  const navigate = useNavigate();
  const {isLoggedIn, user } = useSelector((state: RootState) => state.auth);

 
  const templates = [
    { id: "menus/template1", name: "Lusminous", preview: "/pre1.jfif", path: 'menus/template1', },
    {
      id: "menus/template2",
      name: "Template 2",
      preview: "/path/to/template2-preview.jfif",
      path: 'menus/template2',
    },
    {
      id: "menus/template3",
      name: "Template 3",
      preview: "/path/to/template3-preview.png",
    },
    {
      id: "menus/template4",
      name: "Template 4",
      preview: "/path/to/template4-preview.png",
    },
  ];
  return (
    <>
      <Navbar />
      <section id="menus-section">
        <h1>Menu Templates</h1>
        <div className="templates-grid">
          {templates.map((template) => (
            <Link to={`/${template.id}`} className="template-name">
              <div key={template.id} className="template-item">
                <div className="template-preview">
                  {/* <img
                  src={template.preview}
                  alt={`${template.name} preview`}
                  className="preview-image"
                /> */}
                  <iframe
                    src={template.path}
                    title={`${template.name} preview`}
                    className="preview-iframe"
                    scrolling="no"
                  ></iframe>
                </div>
                {template.name}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MenusTemplates;
