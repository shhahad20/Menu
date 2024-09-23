import "../styles/intro.scss";
import { ContainerScroll } from "./text";

const Intro: React.FC = () => {
  return (
    <section id="intro-section">
      <div className="intro-container"> 
        
      </div>
      <ContainerScroll titleComponent={          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white" style={{color: '#2A292B', letterSpacing: '-1px'}}>
            Where Menus <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none" style={{color: '#2A292B', letterSpacing: '-1px'}}>
              Meet Creativity!
              </span>
            </h1>
          </>} 
          >
      <div className="main-content">
      <img src="/menu_1.svg" alt="menu-img" className="menu-nobg-img" />

      </div>
      </ContainerScroll>
    </section>
  );
};

export default Intro;
