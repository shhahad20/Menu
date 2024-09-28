import React, { useState } from "react";
import "../styles/pricing.scss";

const PricingCards: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const prices = {
    starter: isAnnual ? 150 : 15, 
    professional: isAnnual ? 350 : 35, 
    premium: isAnnual ? 750 : 75,
  };
  return (
    <div id="pricing-section">
      <div>
        <h1>Pricing Plans</h1>
        <p>
          We provide flexible and affordable options for every type of
          restaurant and café.<br></br> Explore our options below to find the
          perfect fit for your business!
        </p>
      </div>

      <div className="toggle">
        <button
          className={!isAnnual ? "active" : ""}
          onClick={() => setIsAnnual(false)}
        >
          Monthly
        </button>
        <button
          className={isAnnual ? "active" : ""}
          onClick={() => setIsAnnual(true)}
        >
          Annually
        </button>
      </div>


      <div className="pricing-cards-container">
        <div className="card">
          <h2>Starter Plan</h2>
          <p>Ideal for small cafés and food trucks just getting started.</p>
          <h2>${prices.starter} / {isAnnual ? "year" : "month"}</h2>
          <ul>
            <li>
              <span>Custom Menu Design:</span> Choose from a selection of
              templates.
            </li>
            <li>
              <span>Basic Customization:</span> Adjust colors, fonts, and
              images.
            </li>
            <li>
              <span>Mobile-Friendly:</span> Responsive design for all devices.
            </li>
            <li>
              <span>Basic Analytics:</span> Track menu views and customer
              interactions.
            </li>
          </ul>
        </div>

        <div className="card pro-card">
          <h2>Professional Plan</h2>
          <p>Perfect for growing restaurants looking for more features.</p>
          <h2>${prices.professional} / {isAnnual ? "year" : "month"}</h2>
          <ul>
            <li>
              <span>Custom Menu Design:</span> Choose from a selection of
              templates.
            </li>
            <li>
              <span>Advanced Customization:</span> More design options and
              layouts.
            </li>
            <li>
              <span>Mobile-Friendly:</span> Responsive design for all devices.
            </li>
            <li>
              <span>SEO Optimization:</span> Boost your online visibility.
            </li>
            <li>
              <span>Menu Management Tools:</span> Easily update and manage
              seasonal items.
            </li>
            <li>
              <span>Email Support:</span> Priority response for your inquiries.
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>Premium Plan</h2>
          <p>Designed for established restaurants that want the best.</p>
          <h2>${prices.premium} / {isAnnual ? "year" : "month"}</h2>
          <ul>
            <li>
              <span>Unlimited Menu Items:</span> No restrictions on the number
              of dishes.
            </li>
            <li>
              <span>Custom Domain:</span> Host your menu on your own domain.
            </li>
            <li>
              <span>Advanced Analytics:</span> In-depth insights into customer
              preferences.
            </li>
            <li>
              <span>Dedicated Support:</span> 24/7 support from our expert team.
            </li>
          </ul>
        </div>
      </div>

      <div className="cta-section">
        <h2>Try Us Risk-Free!</h2>
        <p>
          Not sure which plan is right for you? Take advantage of our 7-day free
          trial! Experience all the features of our Premium Plan with no
          obligation.
        </p>
      </div>
    </div>
  );
};

export default PricingCards;
