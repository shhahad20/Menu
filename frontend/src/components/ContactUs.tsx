import { useState } from "react";
import "../styles/contact.scss";

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Submit form logic here
        console.log("Form submitted", formData);
      };
  return (
    <section id="contact-section">
<div className="contact-header"><h1 className="header">Get In Touch </h1></div>
<div className="container">
    <div className="left">
        <div className="form-container">
        <form className="form max-w-lg mx-auto p-6 shadow-md rounded-md" onSubmit={handleSubmit}>
      <h2 className="form-header text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

      <div className="mb-4">
        <label htmlFor="name" className="title block text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className=" input-bg mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className=" title block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="input-bg mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className=" title block text-sm font-semibold text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          className="input-bg mt-1 p-2 w-full border border-gray-300 rounded-md"
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        className="sub w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Send Message
      </button>
    </form>
        </div>
    </div>
    <div className="right">
        <div className="right-container">
            <div className="grid-item">
                <div className="item-top">
                {/* <img src="/support-w.svg" width={20} height={20} alt="feedback" className="feedback-img" /> */}
               <h2 className="item-header">Customer Support</h2>
                </div>
               <p className="item-p">Our support team is available to address any concerns or queries you may have.</p>
            </div>
            <div className="grid-item">
            <h2 className="item-header">Feedback and Suggestions</h2>
            <p className="item-p">We value your feedback and are continuously working to imporve our service.</p>
            </div>
            <div className="grid-item">
            <h2 className="item-header">Media Inquiries</h2>
            <p className="item-p">For media-realted questions or press inquiries, please contact us at mail@mail.com</p>
            </div>
            <div className="grid-item"></div>
        </div>
    </div>
</div>
    </section>
  );
};

export default ContactUs;
