import React from 'react';
import '../styles/menus.scss';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MenusTemplates: React.FC = () => {
  const templates = [
    { id: 'menus/template1', name: 'Lusminous', preview: '/pre1.jfif' },
    { id: 'menus/template2', name: 'Template 2', preview: '/path/to/template2-preview.jfif' },
    { id: 'menus/template3', name: 'Template 3', preview: '/path/to/template3-preview.png' },
    { id: 'menus/template4', name: 'Template 4', preview: '/path/to/template4-preview.png' },
  ];
  return (
    <>
    <Navbar/>
    <section id="menus-section">
    <h1>Menu Templates</h1>
        <div className="templates-grid">
          {templates.map((template) => (
            <Link to={`/${template.id}`} className="template-name">
            <div key={template.id} className="template-item">
              <div className="template-preview">
                <img
                  src={template.preview}
                  alt={`${template.name} preview`}
                  className="preview-image"
                />
              </div>
                {template.name}
            </div>
            </Link>
          ))}
        </div>
        
    </section>
    <Footer/>
    </>
  );
};


export default MenusTemplates;
