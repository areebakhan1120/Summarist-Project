"use client";

import { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import Accordian from "./accordion";

const PLAN_FEATURES = [
  {
    icon: IoDocumentTextSharp,
    title: "Key ideas in few min",
    desc: "with many books to read",
  },
  {
    icon: RiPlantFill,
    title: "3 million",
    desc: "people growing with Summarist everyday",
  },
  {
    icon: FaHandshake,
    title: "Precise recommendations",
    desc: "collections curated by experts",
  },
];

const PLANS: { id: "yearly" | "monthly"; title: string; price: string; trial: string }[] = [
  {
    id: "yearly",
    title: "Premium Plus Yearly",
    price: "$99.99/year",
    trial: "7-day free trial included",
  },
  {
    id: "monthly",
    title: "Premium Monthly",
    price: "$9.99/month",
    trial: "No trial included",
  },
];

const FAQs = [
  {
    title: "How does the free 7-day trial work?",
    content:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },

  {
    title:"Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    content: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },

  {
    title:"What's included in the Premium plan?",
    content: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
  },

  {
    title:"Can I cancel during my trial or subscription?",
    content: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
  }


];

export default function Landing() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  const PRICE_IDS = {
    monthly: "price_1StKJKKC0NN3ypdt4BecltHd",
    yearly: "price_1StKJbKC0NN3ypdtQs0ve6fH",
  };

  const handleCheckout = async () => {
    try {
      const priceId = PRICE_IDS[selectedPlan];
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
        // Just in case we don't redirect
        setLoading(false);
    }
  };


  return (
    <div className="row max-w-[1070px] w-full mx-auto px-6">
      <div className="container w-full py-10">
        {/* Features */}
        {loading ? (
          <div className="plan__feature-wrapper grid grid-cols-1 md:grid-cols-3 justify-items-center text-center gap-6 max-w-[800px] mx-auto mb-14">
            {[1,2,3].map((n)=> (
              <div key={n} className="plan__feature w-full">
                <div className="mx-auto h-14 w-14 rounded bg-gray-200 animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="plan__feature-wrapper grid grid-cols-1 md:grid-cols-3 justify-items-center text-center gap-6 max-w-[800px] mx-auto mb-14">
            {PLAN_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="plan__feature">
                <figure className="feature__icon flex justify-center text-[#032b41] mb-3">
                  <Icon size={55} />
                </figure>
                <div className="feature__text text-[#394547] leading-relaxed">
                  <b>{title}</b> {desc}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Plan selection title */}
        <div className="section__title text-center mb-6">
          Choose the plan that fits you
        </div>

        {/* Plan cards */}
        {PLANS.map(({ id, title, price, trial }, index) => (
          <div key={id}>
            <div
              className={`flex gap-6 p-6 bg-[#f1f6f4] border-4 rounded cursor-pointer max-w-[680px] mx-auto mb-4 ${
                selectedPlan === id ? "border-[#2bd97c]" : "border-[#bac8ce]"
              }`}
              onClick={() => setSelectedPlan(id)}
            >
              <div className="relative w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                {selectedPlan === id && (
                  <div className="absolute w-[6px] h-[6px] bg-black rounded-full"></div>
                )}
              </div>
              <div className="plan__card--content">
                <div className="text-[18px] font-semibold text-[#032b41] mb-2">
                  {title}
                </div>
                <div className="text-[24px] font-bold text-[#032b41] mb-2">
                  {price}
                </div>
                <div className="text-[14px] text-[#6b757b]">{trial}</div>
              </div>
            </div>
            {/* OR separator between first and second plan */}
            {index === 0 && (
              <div className="flex items-center gap-2 max-w-[240px] my-6 mx-auto text-[14px] text-[#6b757b] before:flex-1 before:h-px before:bg-[#bac8ce] before:content-[''] after:flex-1 after:h-px after:bg-[#bac8ce] after:content-['']">
                <div className="plan">or</div>
              </div>
            )}
          </div>
        ))}

        {/* CTA & FAQ placeholders */}
        <div className="bg-white sticky bottom-0 z-10 py-8 flex flex-col items-center gap-4">
          <div className="btn_wrapper">
         <button
  onClick={handleCheckout}
  className="w-full sm:w-[300px] h-10 min-w-[180px] bg-[#2bd97c] text-[#032b41] rounded text-[16px] flex items-center justify-center transition-colors duration-200"
>
  <span>
    {selectedPlan === "yearly"
      ? "Start your free 7-day trial"
      : "Subscribe monthly"}
  </span>
</button>

          </div>
          <div className="text-[12px] text-[#6b757b] text-center">
            Cancel your trial at any time before it ends, and you won't be
            charged.
          </div>
        </div>
        <div className="faq__wrapper">
        {FAQs.map((faq, index) => (
    <Accordian
      key={index}
      title={faq.title}
      content={faq.content}
    />
  ))}
        </div>
      </div>
    </div>
  );
}
