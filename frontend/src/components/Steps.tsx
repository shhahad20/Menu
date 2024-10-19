"use client";
import {
  ContentItem,
  StickyScroll,
} from "../components/ui/steps-sticky-scroll";
import "../styles/steps.scss";

const content: ContentItem[] = [
  {
    title: (
      <span className="text-darkCustomColor-600">1. Sign Up for an Account</span>
    ),
    description: (
      <span className="text-gray-400">
        Visit our website and click on the <button>Sign Up</button> <br />{" "}
        <br />
        Fill in your details to create a new account. You’ll receive a
        confirmation email to verify your account.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/Signup-blue20.svg"
          width={300}
          height={250}
          className=" object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    // Custom text color
    title: <span className="text-darkCustomColor-600">2. Choose Your Plan</span>,
    description: (
      <span className="text-gray-400">
        Explore our pricing plans and select the one that best fits your needs.{" "}
        <br />
        Whether you're a small café or a large restaurant, we have options for
        everyone
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/plans-blue.svg"
          width={300}
          height={250}
          className=" object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    // Custom text color
    title: (
      <span className="text-darkCustomColor-600">3. Customize Your Menu</span>
    ),
    description: (
      <span className="text-gray-400">
        Enter details for each menu item, including names, descriptions, prices,
        and any dietary information.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/customize-blue.svg"
          width={250}
          height={200}
          className=" object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: <span className="text-darkCustomColor-600">4. Go Live!</span>,
    description: (
      <span className="text-gray-400">
        Once you’re satisfied with your design, hit the "Publish" button to make{" "}
        <br />
        your menu live! Share the link on your website, social media, or printed
        materials.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/qrcode-blue.svg"
          width={150}
          height={100}
          className=" object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: <span className="text-darkCustomColor-600"></span>,
    description: <span className="text-gray-400"></span>,
    content: (
      <div className="h-full w-full flex items-center justify-center text-white"></div>
    ),
  },
];

export function Steps() {
  return (
    <div className="steps-section p-0">
      <div className="steps-header">
        <h1 className="steps-text">How to Get Started</h1>
      </div>
      <StickyScroll content={content} />
    </div>
  );
}
