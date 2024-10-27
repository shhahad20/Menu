import React, { useEffect, useState } from "react";
import "../styles/faqs.scss"; 
import { fetchFAQs } from "../services/faqService";

interface FAQ {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);  
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFAQs = async () => {
      try {
        const response = await fetchFAQs();
        console.log(response.payload);
        setFaqs(response.payload); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs.");
        setLoading(false);
      }
    };

    getFAQs();
  }, []);

  if (loading) return <div>Loading FAQs...</div>;
  if (error) return <div>{error}</div>;
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index); 
  };

  return (
    <div className="faq-container">
    <h2 className="faq-title">FAQ's</h2>
    <div className="faq-items">
      {error && <p>{error}</p>}
      {faqs && faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleActiveIndex(index)}>
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  </div>
  );
};

export default FAQ;
