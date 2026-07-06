"use client";

import { useState } from "react";

export default function Faq() {
  const faqs = [
    {
      q: "Do you provide doorstep car wash?",
      a: "Yes. We provide premium doorstep car washing at your home or office.",
    },
    {
      q: "Which cities do you serve?",
      a: "Currently we are serving Jhunjhunu and nearby areas.",
    },
    {
      q: "How long does a wash take?",
      a: "Normally 45–90 minutes depending on the selected package.",
    },
    {
      q: "Do I need to provide water or electricity?",
      a: "No. Our team carries everything required for the service.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#0B0F19] py-24 px-6 text-white">
      <div className="max-w-4xl mx-auto">

        <p className="text-blue-400 uppercase tracking-[5px] text-center font-semibold">
          FAQ
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 space-y-5">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left text-xl font-semibold"
              >
                {item.q}
                <span>{open === index ? "−" : "+"}</span>
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-400">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}