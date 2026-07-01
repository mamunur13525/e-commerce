"use client";

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="w-full space-y-6">
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}