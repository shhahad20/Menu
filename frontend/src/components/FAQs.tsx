import React, { useState } from "react";
import "../styles/faqs.scss"; 


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [ 
    {
      question: "What is a digital menu, and how does it work?",
      answer:
        "A digital menu is an electronic version of your restaurant or cafe’s menu that can be accessed via smartphones, tablets, or other devices. Customers scan a QR code or click a link to view your menu online, providing an easy, contactless way to see your offerings.",
    },
    {
      question: "How can I update my menu?",
      answer:
        "You can easily update your menu through our user-friendly dashboard. Add, remove, or modify items and prices, and changes will be reflected in real-time on your digital menu.",
    },
    {
      question: "Is the digital menu customizable?",
      answer:
        "Yes, our digital menus are fully customizable. You can select different templates, fonts, colors, and even include images to match your brand’s aesthetic.",
    },
    {
      question: "Can customers place orders directly from the digital menu?",
      answer:
        "Absolutely! We offer an integration option where customers can place orders directly from the menu, streamlining the ordering process for both dine-in and takeaway services.",
    },
    {
      question: "How much does it cost to create a digital menu?",
      answer:
        "Our pricing plans vary based on the features and level of customization you need. Visit our pricing page to see detailed plans or contact our team for a custom quote.",
    },
    {
      question: "Do I need technical skills to use the digital menu platform?",
      answer:
        "No technical skills are required. Our platform is designed to be intuitive and easy to use, even for beginners. Plus, we offer support to guide you through the setup process.",
    },
    {
      question: "Is there a limit to the number of items I can add to my menu?",
      answer:
        "There is no limit on the number of items you can add. You can include as many categories and menu items as you need to showcase your offerings.",
    },
    {
      question: "Can I add images to my digital menu?",
      answer:
        "Yes, you can easily add high-quality images of your menu items to make your digital menu more engaging and visually appealing.",
    },
    {
      question: "Does the digital menu support multiple languages?",
      answer:
        "Yes, we provide support for multiple languages, making it easy for restaurants and cafes to serve a diverse clientele.",
    },
    {
      question: "How secure is the platform?",
      answer:
        "Our platform uses industry-standard security measures to ensure that your menu data is protected and your customers’ interactions are safe.",
    },
  ];
  

  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index); 
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQ's</h2>
      <div className="faq-items">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleActiveIndex(index)}>
              <span>{item.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
