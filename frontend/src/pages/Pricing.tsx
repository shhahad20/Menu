import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCards from '../components/PricingCards';


const Pricing: React.FC = () => {
  return (
    <>
    <Navbar/>
    <PricingCards/>
    <Footer/>
    </>
  );
};


export default Pricing;
