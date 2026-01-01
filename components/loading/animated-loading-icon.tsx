"use client";

import React from "react";

export function AnimatedLoadingIcon() {
  return (
    <div className="flex items-center justify-center w-20 h-32">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-orange-500"
      >
        <defs>
          <style>{`
            @keyframes fillBag {
              0% {
                fill-opacity: 0;
              }
              100% {
                fill-opacity: 1;
              }
            }

            @keyframes strokePulse {
              0%, 100% {
                stroke-width: 2;
                opacity: 1;
              }
              50% {
                stroke-width: 2.5;
                opacity: 0.7;
              }
            }

            @keyframes arrowBounce {
              0% {
                transform: translateY(0px);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                transform: translateY(-8px);
                opacity: 0;
              }
            }

            @keyframes arrowRotate {
              0%, 100% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(5deg);
              }
            }

            .bag {
              animation: fillBag 2s ease-in-out infinite;
            }

            .bag-stroke {
              animation: strokePulse 1.5s ease-in-out infinite;
            }

            .arrow-group {
              animation: arrowRotate 2s ease-in-out infinite;
              transform-origin: 12px 5px;
            }

            .arrow-path {
              animation: arrowBounce 1s ease-in-out infinite;
              animation-delay: 0.3s;
            }
          `}</style>
        </defs>

        {/* Bag */}
        <g className="bag-stroke">
          <path
            d="M4 8h16l-2 12H6L4 8z"
            fill="currentColor"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            className="bag"
          />
        </g>

        {/* Arrow Group */}
        <g className="arrow-group">
          {/* Arrow stem */}
          <path
            d="M12 8V4"
            stroke="#4ade80"
            strokeWidth="2"
            strokeLinecap="round"
            className="arrow-path"
          />
          {/* Left arrow head */}
          <path
            d="M12 4l-3 3"
            stroke="#4ade80"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-path"
          />
          {/* Right arrow head */}
          <path
            d="M12 4l3 3"
            stroke="#4ade80"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-path"
          />
        </g>
      </svg>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 size-full z-50  min-h-screen bg-linear-to-br from-[#f4f6f6] to-[#e8ebe8] flex flex-col items-center justify-center">
      <div className="mb-2">
        <AnimatedLoadingIcon />
      </div>
      <p className="text-gray-500 text-center max-w-xs">
        Getting your products ready...
      </p>
      {/* Animated dots */}
    </div>
  );
}
