"use client";
import { ContentItem, StickyScroll } from "../components/ui/sticky-scroll-reveal";
import '../styles/stickyScroll.scss';

const content:ContentItem[] = [
  {
    title: (
      <span className="text-2xl font-bold text-slate-100">Simplicity</span> // Custom text color
    ),
    description: (
      <span className="text-gray-400">
        Creating and updating your menu has never been easier! Our intuitive platform allows you to design and modify your menu in just a few clicks—no technical skills or coding knowledge required. Spend less time worrying about the details and more time delighting your customers with great food.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/simplicity.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: (
      <span className="text-darkCustomColor-600">Customization</span> // Custom text color
    ),
    description: (
      <span className="text-gray-400">
        Your menu should reflect your unique culinary identity. With our extensive customization options, you can tailor every aspect of your menu’s design and layout. Choose from a variety of fonts, colors, and images to create a visual experience that matches your restaurant's style and ambiance, whether it's rustic, modern, or something in between.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/unique.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: (
      <span className="text-2xl font-bold text-slate-100">Mobile-Friendly</span> // Custom text color
    ),
    description: (
      <span className="text-gray-400">
        In today’s digital world, a mobile-friendly menu is essential. Our responsive designs ensure that your menu looks stunning and functions seamlessly on any device, from smartphones to tablets. This means your customers can easily browse your offerings, place orders, or make reservations, all while on the go.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/mobile.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: (
      <span className="text-2xl font-bold text-slate-100">SEO Optimized</span> // Custom text color
    ),
    description: (
      <span className="text-gray-400">
        Increase your online visibility and attract more customers with our SEO-optimized features. Our platform helps you implement best practices for search engine optimization, ensuring that your menu appears prominently in search results. This boosts your chances of being discovered by potential diners looking for their next favorite spot.
      </span>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="/search.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="scroll-section p-0">
      <div className="scroll-section-header"><h1>Why Choose Us?</h1></div>
      <StickyScroll content={content} />
    </div>
  );
} 
