"use client";

export function DeliveryInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      <div className="flex items-start gap-3">
        <div className="text-orange-500 mt-1">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            Free Delivery{" "}
            <span className="font-normal text-gray-500">Apply To</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            All Order Over ৳1000
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="text-orange-500 mt-1">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            Great Daily Deal{" "}
            <span className="font-normal text-gray-500">We</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Providing Organic Products
          </p>
        </div>
      </div>
    </div>
  );
}