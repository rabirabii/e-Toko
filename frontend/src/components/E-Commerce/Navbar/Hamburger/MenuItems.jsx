import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItems = ({ name, href, icon: Icon, onClick }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="mb-2"
    >
      <Link
        to={href}
        className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{name}</span>
      </Link>
    </motion.li>
  );
};

export default MenuItems;
