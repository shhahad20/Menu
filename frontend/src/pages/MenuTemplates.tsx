import React from 'react';
import '../styles/home.scss'
import { Link } from 'react-router-dom';

const MenusTemplates: React.FC = () => {
  return (
    <section id="menus-section">
        <ul>
          <li><Link to="/template1">Template 1</Link></li>
          <li><Link to="/template2">Template 2</Link></li>

        </ul>
    </section>
  );
};


export default MenusTemplates;
