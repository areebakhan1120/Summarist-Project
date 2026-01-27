"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface AccordionItem {
  title: string;
  content: string;
}



export default function Accordian({ title, content }: AccordionItem) {
  const [accordian, setAccordian] = useState(false);

  return (
    <div className="accordian__card border-b border-[#ddd] mb-2 overflow-hidden">
      <div
        className="accordian__header flex justify-between items-center cursor-pointer py-6 gap-2"
        onClick={() => setAccordian(!accordian)}
      >
        <div className="accordian__title font-medium text-[24px] relative mb-0 text-[#032b41] transition-all duration-300">
{title}
        </div>
        <div
          className={`accordian__icon transition-transform duration-300 ${
            accordian ? "rotate-180" : ""
          }`}
        >
         <RiArrowDownSLine size={30} />
        </div>
      </div>
      <div
        className={`accordian__body overflow-hidden transition-[height] duration-300 ease-in-out ${
          accordian ? "h-auto pt-6" : "h-0"
        }`}
      >
        <div className="accordian__body min-h-[1px] pb-6 text-[#394547] leading-relaxed">
        {content}
        </div>
      </div>
    </div>
  );
}
