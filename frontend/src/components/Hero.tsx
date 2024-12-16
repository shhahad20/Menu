import { Link } from "react-router-dom";
import "../styles/hero.scss";
// import Intro from "./Intro";


const Hero: React.FC = () => {
 
  return (
  
    <section id="hero-section">
    <div id="hero_heading_section">

      <h1 className="hero-slogan">We believe that every meal tells a story</h1>

      <div id="hero_heading">
        {/* <h1 className="brackets">[ </h1> */}
        <div className="name">
          <h1 className="word">We-</h1>
          <h1 className="word">Re-</h1>
          <h1 className="word">We-</h1>
          <h1 className="word">Re-</h1>
        </div>
        <div>
          <h1 className="text" >Design</h1>
        </div>
        {/* <h1 className="brackets">] </h1> */}
      </div>

      <div className="hero_heading_two">
      <h1 className="text">Your Menu </h1>
      </div>
      <div className="explore-container">
      <h1 className="hero-description">Our platform empowers restaurants and cafes to create stunning menus.</h1>

        <button className="her-btn"><Link to="/pricing">Try it for free</Link></button>
      </div>
    </div>
    {/* <Intro/> */}
    </section>
    
  );
};

export default Hero;
