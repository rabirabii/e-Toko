import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import Navigation from "./Navigation";
import { Menu, X } from "lucide-react";

const toggleMenu = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at calc(100% - 40px) 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Hamburger = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className="absolute top-0 right-0 bottom-0 w-full md:w-80"
    >
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-full md:w-80 bg-white shadow-lg"
        variants={toggleMenu}
      >
        <Navigation />
      </motion.div>
      <button
        onClick={() => toggleOpen()}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white shadow-md"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </motion.nav>
  );
};

export default Hamburger;
