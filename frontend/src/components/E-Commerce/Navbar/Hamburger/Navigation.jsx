import React from "react";
import { motion } from "framer-motion";
import { navItems } from "../navItems";
import MenuItems from "./MenuItems";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = () => {
  return (
    <motion.ul variants={variants} className="p-4 mt-12">
      {navItems.map((item) => (
        <MenuItems
          key={item.name}
          name={item.name}
          href={item.path}
          icon={item.icon}
        />
      ))}
    </motion.ul>
  );
};

export default Navigation;
