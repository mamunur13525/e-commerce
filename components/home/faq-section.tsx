"use client";

import { useState } from "react";

const faqData = [
  {
    question: "আমার অর্ডার পেতে কত সময় লাগবে?",
    answer: "সাধারণত ২ থেকে ৫ কার্যদিবসের মধ্যে আপনার অর্ডার ডেলিভারি করা হয়।",
  },
  {
    question: "আপনারা কি আন্তর্জাতিক শিপিং পরিষেবা দেন?",
    answer: "বর্তমানে আমরা শুধুমাত্র বাংলাদেশের ভেতরেই ডেলিভারি দিচ্ছি।",
  },
  {
    question: "আপনারা কোন কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?",
    answer: "আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং ক্রেডিট বা ডেবিট কার্ডের মাধ্যমে পেমেন্ট গ্রহণ করি। আর গোপনীয়তা সম্পর্কে, আপনার তথ্য সম্পূর্ণ সুরক্ষিত।",
  },
  {
    question: "আপনাদের রিটার্ন পলিসি কী? এবং রিফান্ড কীভাবে প্রক্রিয়া করা হয়?",
    answer: "পণ্য ক্ষতিগ্রস্ত হলে বা ভুল পণ্য থাকলে, আপনি ৭ দিনের মধ্যে পরিবর্তন করতে পারবেন।",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003d29]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#003d29] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}