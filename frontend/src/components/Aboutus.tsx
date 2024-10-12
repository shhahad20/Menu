import React from "react";
import "../styles/about.scss";

const AboutUs: React.FC = () => {
  return (
    <section id="about-section">
      <div className="content-container">
        <div className="mission-container">
          <h1>Our Mission</h1>
          <p>
            At MenuCraft, our mission is to empower restaurants and cafes to
            showcase their culinary creations through beautifully designed
            online menus. We believe that a menu is more than just a list of
            dishes; it is an invitation to explore new flavors and experiences.
          </p>
        </div>
        <div className="whowe-section">
          {/* <img src="/me.jpg" alt="me" /> */}
          <h1>Who We Are</h1>
          <p>
            Founded by a Saudi woman developer how also loves to design,
            MenuCraft was born out of a passion for enhancing the dining
            experience. We understand the challenges that restaurant owners face
            in today’s digital landscape, and we’re dedicated to providing a
            solution that is both user-friendly and effective.
          </p>
        </div>
        <div className="wedo-section">
          <h1>What We Do</h1>
          <p>
            We offer a powerful platform that allows you to create, customize,
            and manage your online menu with ease. Whether you run a cozy café
            or a bustling fine dining restaurant, our tools are designed to help
            you reflect your unique culinary identity.
          </p>
        </div>

        <div className="feature-section">
            <div className="feature">
            <h1>Our Features</h1>
            
            <div className="feature-container">
                <div className="feature-content">
                    <h2>Intuitive Design</h2>
                    <p>Our user-friendly interface makes menu creation accessible to everyone, regardless of technical skills.</p>
                </div>
                <div className="feature-content">
                    <h2>Full Customization</h2>
                    <p>Tailor your menu’s design, layout, and content to match your restaurant’s style and ambiance.</p>
                </div>
                <div className="feature-content">
                    <h2>Mobile Optimization</h2>
                    <p>With our responsive designs, your menu will look great on any device, ensuring a seamless experience for your customers.</p>
                </div>
                <div className="feature-content">
                    <h2>SEO Tools</h2>
                    <p>Our platform helps boost your online visibility, making it easier for new customers to discover your restaurant.</p>
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
