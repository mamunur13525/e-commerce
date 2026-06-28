import React from "react";
import { motion } from "framer-motion";

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 10 },
  },
};

const pocketItemsVariants = {
  initial: { y: 15, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const pocketBounceVariants = {
  animate: {
    y: [0, -3, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
export const PocketShopLoader: React.FC = () => {
  return (
    <div className="w-fit select-none">
      {/* Floating wrapper to give the whole logo a gentle idle animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-md p-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 450"
          className="w-full h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        >
          {/* Gradients and Filters */}
          <defs>
            {/* Blue Text Gradient */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3ca5cc" />
              <stop offset="100%" stopColor="#1e6b8f" />
            </linearGradient>

            {/* Orange Text Gradient */}
            <linearGradient
              id="orangeGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffb347" />
              <stop offset="100%" stopColor="#ff7b00" />
            </linearGradient>

            {/* Pocket Denim Gradient */}
            <linearGradient
              id="pocketGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#5bc0be" />
              <stop offset="100%" stopColor="#2e7d82" />
            </linearGradient>

            {/* Bubbly Gloss Highlight Filter */}
            <filter
              id="bubblyShine"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* =========================================================
              1. TOP ELEMENT: SHOPPING CART WITH HEART
             ========================================================= */}
          <g transform="translate(220, 40)">
            {/* Shopping Cart Lines */}
            <motion.path
              d="M0 10 h15 l15 35 h35 l12 -25 h-55"
              fill="none"
              stroke="#438fa8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Wheels */}
            <motion.circle
              cx="30"
              cy="52"
              r="5"
              fill="#438fa8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            />
            <motion.circle
              cx="55"
              cy="52"
              r="5"
              fill="#438fa8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            />
            {/* Heart inside Cart */}
            <motion.path
              d="M42 22 C37 12, 22 17, 32 30 C42 40, 42 40, 42 40 C42 40, 42 40, 52 30 C62 17, 47 12, 42 22 Z"
              fill="#ff9e22"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: 1,
              }}
              transition={{
                scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                opacity: { delay: 0.4, duration: 0.3 },
              }}
              style={{ transformOrigin: "42px 27px" }}
            />
          </g>

          {/* =========================================================
              2. MIDDLE ROW: "POCKET" (Staggered Entrance)
             ========================================================= */}
          <motion.g
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Letter 'P' - with slight rotation */}
            <motion.text
              variants={letterVariants}
              x="50"
              y="220"
              fill="url(#blueGradient)"
              fontSize="110"
              fontWeight="900"
              fontFamily="'Rubik', system-ui, -apple-system, sans-serif"
              filter="url(#bubblyShine)"
              initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
              animate={{ rotate: -10, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                delay: 0.2,
              }}
            >
              P
            </motion.text>

            {/* THE POCKET (Replaces 'o') */}
            <motion.g
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: -50, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
            >
              {/* Pocket Content (Books/Plant) - Stagger entrance */}
              <motion.g
                initial="initial"
                animate="animate"
                variants={pocketItemsVariants}
              >
                <motion.rect
                  x="135"
                  y="195"
                  width="20"
                  height="30"
                  rx="3"
                  fill="#3eaed2"
                  transform="rotate(-10 135 195)"
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: -10, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                />
                <motion.rect
                  x="155"
                  y="190"
                  width="22"
                  height="32"
                  rx="3"
                  fill="#e64c3c"
                  transform="rotate(5 155 190)"
                  initial={{ rotate: 20, opacity: 0 }}
                  animate={{ rotate: 5, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                />
                <motion.path
                  d="M 178,190 Q 175,180 185,180 Q 190,190 178,195 Z"
                  fill="#2ecc71"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                />
                <motion.path
                  d="M 183,192 Q 185,182 192,185 Q 192,195 183,192 Z"
                  fill="#27ae60"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                />
              </motion.g>

              {/* Pocket Body - Draws in */}
              <motion.path
                d="M 130,215 L 195,215 L 195,250 C 195,275 180,285 162.5,285 C 145,285 130,275 130,250 Z"
                fill="url(#pocketGradient)"
                stroke="#6fcce6"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeInOut" }}
              />

              {/* Stitch line - Draws in after pocket body */}
              <motion.path
                d="M 130,223 L 195,223"
                stroke="#245d70"
                strokeWidth="2"
                strokeDasharray="4,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
              />

              {/* Camera on Pocket - Staggered reveal */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                }}
              >
                <rect
                  x="143"
                  y="235"
                  width="38"
                  height="24"
                  rx="5"
                  fill="#fefdf1"
                  stroke="#245d70"
                  strokeWidth="1.5"
                />
                <motion.rect
                  x="147"
                  y="230"
                  width="12"
                  height="5"
                  rx="1"
                  fill="#f39c12"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                  style={{ transformOrigin: "153px 232px" }}
                />
                <motion.circle
                  cx="162"
                  cy="247"
                  r="8"
                  fill="#245d70"
                  initial={{ r: 0 }}
                  animate={{ r: 8 }}
                  transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                />
                <circle cx="162" cy="247" r="5" fill="#fefdf1" />
                <motion.circle
                  cx="174"
                  cy="239"
                  r="2"
                  fill="#e64c3c"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 2, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.2 }}
                />
              </motion.g>
            </motion.g>

            {/* Letters: cket */}
            {["c", "k", "e"].map((letter, index) => {
              const xPositions = [210, 270, 335];
              return (
                <motion.text
                  key={letter}
                  variants={letterVariants}
                  x={xPositions[index]}
                  y={220}
                  fill="url(#blueGradient)"
                  fontSize="110"
                  fontWeight="900"
                  fontFamily="'Rubik', system-ui, -apple-system, sans-serif"
                  filter="url(#bubblyShine)"
                >
                  {letter}
                </motion.text>
              );
            })}
            <motion.text
              key={"t"}
              variants={letterVariants}
              x={390}
              y={220}
              fill="url(#blueGradient)"
              fontSize="110"
              fontWeight="900"
              fontFamily="'Rubik', system-ui, -apple-system, sans-serif"
              filter="url(#bubblyShine)"
              initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 10, opacity: 1, scale: 1 }}
            >
              t
            </motion.text>
          </motion.g>

          {/* =========================================================
              3. BOTTOM ROW: "Shop" (Spring Slide-Up)
             ========================================================= */}
          <motion.g
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.8,
            }}
          >
            <text
              x="250"
              y="330"
              textAnchor="middle"
              fill="url(#orangeGradient)"
              fontSize="115"
              fontWeight="900"
              fontFamily="'Rubik', system-ui, -apple-system, sans-serif"
              filter="url(#bubblyShine)"
              letterSpacing="2"
            >
              Shop
            </text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

export default PocketShopLoader;
