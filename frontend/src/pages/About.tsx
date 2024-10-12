import React from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/Aboutus';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';


const About: React.FC = () => {
  return (
    <>
    <Navbar/>
    <AboutUs/>
    <ContactUs/>
    <Footer/>
    </>
  );
};


export default About;
