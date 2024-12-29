import React, { useState } from "react";
import "../styles/menus.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { copyMenuTemplate } from "../redux/menu/menuSlice";
import { useDispatch } from "react-redux";

const MenusTemplates: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const templates = [
    {
      id: "3491c484-c425-41b1-9537-841328278931",
      name: "Lusminous",
      preview: "/pre1.jfif",
      path: "menus/template1",
    },
    {
      id: "menus/template2",
      name: "Template 2",
      preview: "/path/to/template2-preview.jfif",
      path: "menus/template2",
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

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
console.log(isLoggedIn + " selected temp : " + selectedTemplate)

  const confirmSelection = async () => {
    if (selectedTemplate) {
      setLoading(true);
      setError(null);

      try {
        // Dispatch the copyMenuTemplate action and get the new menu ID
        await dispatch(copyMenuTemplate(selectedTemplate));
       
        // Navigate to the editing page with the new menu ID
        navigate(`/dashboard/menus`);
 
      } catch (err) {
        setError("Failed to copy the menu. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
        setSelectedTemplate(null);
      }
    }
  };

  const cancelSelection = () => {
    setSelectedTemplate(null);
  };
  return (
    <>
      <Navbar />
      <section id="menus-section">
        <h1>Menu Templates</h1>
        <div className="templates-grid">
          {templates.map((template) => (
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
              <Link to={`/${template.path}`} className="template-name">
                {template.name}
              </Link>
              {isLoggedIn && (
                <div>
                  <button onClick={() => handleSelect(template.id)}>
                    Select
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {selectedTemplate && (
        <div className="popup">
          <div className="popup-content">
            <p>
              {loading
                ? "Processing your request..."
                : "Are you sure you want to select this template?"}
            </p>
            {error && <p className="error-message">{error}</p>}
            {!loading && (
              <div className="popup-buttons">
                <button onClick={cancelSelection}>Cancel</button>
                <button onClick={confirmSelection}>Yes</button>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MenusTemplates;
