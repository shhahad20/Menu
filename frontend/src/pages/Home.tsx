import React from 'react';
import '../styles/home.scss'
import Hero from '../components/Hero';
// import Intro from '../components/Intro';
// import { StickyScrollRevealDemo } from '../components/StickyScrollSection';
// import {Steps} from '../components/Steps';
// import Intro from '../components/Intro';
import Features from '../components/Features';
// import ContactUs from '../components/ContactUs';

const Home: React.FC = () => {
  return (
    <section id="home-section">
      <Hero/>
      <Features/>
      {/* <Intro/> */}
      {/* <StickyScrollRevealDemo/> */}
            {/* <Intro/> */}

      {/* <Steps/> */}
      {/* <ContactUs/> */}
    </section>
  );
};


export default Home;
