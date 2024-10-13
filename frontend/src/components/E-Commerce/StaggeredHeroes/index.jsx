import React from "react";
import { motion } from "framer-motion";

const StaggeredHeroes = ({ children = "", className = "" }) => {
  const text = typeof children === "string" ? children : "";

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`overflow-hidden relative ${className}`}
    >
      <div className="relative inline-block">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.05 * i,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 top-0 left-0">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.05 * i,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default StaggeredHeroes;
