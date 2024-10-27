import "../styles/hero.scss";
import Intro from "./Intro";


const Hero: React.FC = () => {
 
  return (
    <>
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
      <h1 className="hero-description">Our platform empowers restaurants and cafes to create stunning menus.</h1>
      <div className="explore-container">
        <h2 className="her-btn">Try it for free</h2>
      </div>
    </div>
    {/* <div className="hero-img-container">
    <img src="/Corsan.svg" alt="corsan" className="corsan" width="150px" />
    <img src="/rice.svg" alt="corsan" className="corsan" width="150px" />

    </div> */}
    </section>
    <Intro/>
    </>
  );
};

export default Hero;
