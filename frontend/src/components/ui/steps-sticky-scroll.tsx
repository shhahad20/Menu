"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import  '../../styles/steps.scss';
// Define types for the content prop
export type ContentItem = {
  title: string | JSX.Element;  // Allow string or JSX.Element
  description: string | JSX.Element;  // Allow string or JSX.Element
  content?: React.ReactNode;
};

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#F9F4ED",
    "#F9F4ED",
    "#F9F4ED",
  ];
  const linearGradients = [
    "#F9F4ED",
    "#F9F4ED",
    "#F9F4ED",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
<motion.div
  animate={{
    backgroundColor: backgroundColors[activeCard % backgroundColors.length],
  }}
  className="h-[40rem] overflow-y-auto flex flex-row justify-center relative space-x-20 rounded-md p-10 scrollbar-hidden" 
  ref={ref}
>

  <div
    style={{ background: backgroundGradient }}
    className={cn(
      "hidden sm:hidden lg:block h-80 w-80 rounded-md bg-white sticky top-12 overflow-hidden",
      contentClassName
    )}
  >
    {content[activeCard].content ?? null}
  </div>

 
  <div className="div relative flex items-start px-10">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={typeof item.title === "string" ? item.title + index : index} className="my-20">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
          <div className="h-20" />
        </div>
      </div>

</motion.div>
  );
};
