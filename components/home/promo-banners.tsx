import { Button } from "@/components/ui/button";
import type { DiscountCard } from "@/lib/types/metadata";

interface PromoBannersProps {
  discountCards?: DiscountCard[];
}

export function PromoBanners({ discountCards }: PromoBannersProps) {
  const displayCards =
    discountCards && discountCards.length > 0 ? discountCards : [];
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayCards.map((card) => (
          <div
            key={card._id}
            className="relative overflow-hidden rounded-2xl p-8 text-white shadow-sm md:p-10"
            style={{ backgroundColor: card.bg_color }}
          >
            {/* Background pattern decoration */}
            <div className="absolute right-0 top-0 h-full w-2/3 opacity-10">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  fill="currentColor"
                  d="M45.7,-70.5C58.9,-62.5,69.3,-49.4,75.9,-34.7C82.5,-20,85.4,-3.7,81.6,10.6C77.9,24.9,67.5,37.2,56.2,47.3C44.9,57.4,32.7,65.2,19.4,69.1C6.1,73,-8.3,73,-21.8,68.4C-35.3,63.8,-47.9,54.6,-58.1,43.2C-68.3,31.8,-76.1,18.2,-78.9,3.3C-81.7,-11.6,-79.5,-27.8,-70.7,-40.7C-61.9,-53.6,-46.5,-63.2,-31.2,-69.6C-15.9,-76,-0.7,-79.2,14.2,-78.1L45.7,-70.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="relative z-10 max-w-sm">
              <div
                className="mb-4 inline-flex items-center rounded-md px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: card.cta_btn.bg_color,
                  color: card.cta_btn.color,
                }}
              >
                <span className="mr-2">
                  {card.icon === "delivery" ? "📦" : "💳"}
                </span>
                {card.type}
              </div>
              <h3 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
                {card.title}
              </h3>
              <p className="mb-6 h-6 text-lg font-medium">{card.description}</p>

              <Button
                variant="secondary"
                style={{
                  backgroundColor: card.cta_btn.bg_color,
                  color: card.cta_btn.color,
                }}
                className="hover:opacity-90"
              >
                {card.cta_btn.text}
              </Button>
            </div>

            {/* 3D Icon Placeholder */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 ">
              <div
                className="size-32 md:size-40 bg-opacity-30 rounded-xl shadow-2xl flex items-center justify-center transform rotate-12 opacity-50 backdrop:blur-2xl"
                style={{ backgroundColor: card.cta_btn.bg_color }}
              >
                <span className="text-4xl">
                  {card.icon === "delivery" ? "🎁" : "⏰"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
