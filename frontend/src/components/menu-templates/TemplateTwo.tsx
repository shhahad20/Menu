import "../../styles/menus-style/template2.scss";
import HorizontalScroll from "../HorizontalScroll";

const Template2: React.FC = () => {


  return (
    <div className="menu-container-tem2">
      <div className="top-container">
        <h1 className="header">THE BREW</h1>
      </div>

      <div className="section1">
        <div className="section-top">
          <h1 className="sec-header">Cold Coffee</h1>
        </div>

        <HorizontalScroll>
            {/* Cold Coffee items */}
            <div className="item">
              <img className="item-img" src="/Cold-brew.svg" alt="Cold Brew" />
              <h2 className="item-name">Cold Brew</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Cold-brew.svg" alt="Iced V60" />
              <h2 className="item-name">Iced V60</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-coffee.svg"
                alt="Iced Coffee"
              />
              <h2 className="item-name">Iced Coffee</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-latte.svg"
                alt="Iced Latte"
              />
              <h2 className="item-name">Iced Latte</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-Mocha.svg"
                alt="Iced Mocha"
              />
              <h2 className="item-name">Iced Mocha</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-caramel.svg"
                alt="Iced Caramel Macchiato"
              />
              <h2 className="item-name">Iced Caramel Macchiato</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Cold-brew.svg" alt="Iced V60" />
              <h2 className="item-name">Iced V60</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-coffee.svg"
                alt="Iced Coffee"
              />
              <h2 className="item-name">Iced Coffee</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-latte.svg"
                alt="Iced Latte"
              />
              <h2 className="item-name">Iced Latte</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-Mocha.svg"
                alt="Iced Mocha"
              />
              <h2 className="item-name">Iced Mocha</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-caramel.svg"
                alt="Iced Caramel Macchiato"
              />
              <h2 className="item-name">Iced Caramel Macchiato</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Cold-brew.svg" alt="Iced V60" />
              <h2 className="item-name">Iced V60</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-coffee.svg"
                alt="Iced Coffee"
              />
              <h2 className="item-name">Iced Coffee</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-latte.svg"
                alt="Iced Latte"
              />
              <h2 className="item-name">Iced Latte</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-Mocha.svg"
                alt="Iced Mocha"
              />
              <h2 className="item-name">Iced Mocha</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Iced-caramel.svg"
                alt="Iced Caramel Macchiato"
              />
              <h2 className="item-name">Iced Caramel Macchiato</h2>
            </div>
        </HorizontalScroll>
      </div>

      <div className="section1">
        <div className="section-top">
          <h1 className="sec-header">Hot Coffee</h1>
        </div>
        <HorizontalScroll>
            {/* Hot Coffee items */}
            <div className="item">
              <img className="item-img" src="/Esspresso.svg" alt="Espresso" />
              <h2 className="item-name">Espresso</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Caramel-Macchiato.svg"
                alt="Caramel Macchiato"
              />
              <h2 className="item-name">Caramel Macchiato</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Americano.svg" alt="Americano" />
              <h2 className="item-name">Americano</h2>
            </div>
            <div className="item">
              <img
                className="item-img"
                src="/Cappuccino.svg"
                alt="Cappuccino"
              />
              <h2 className="item-name">Cappuccino</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Mocha.svg" alt="Mocha" />
              <h2 className="item-name">Mocha</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Macchiato.svg" alt="Macchiato" />
              <h2 className="item-name">Macchiato</h2>
            </div>
            <div className="item">
              <img className="item-img" src="/Latte.svg" alt="Latte" />
              <h2 className="item-name">Latte</h2>
            </div>
          
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default Template2;