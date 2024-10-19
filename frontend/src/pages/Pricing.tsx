import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCards from '../components/PricingCards';
import { Steps } from '../components/Steps';


const Pricing: React.FC = () => {
  return (
    <>
    <Navbar/>
    <PricingCards/>
    <Steps/>
    <Footer/>
    </>
  );
};


export default Pricing;
