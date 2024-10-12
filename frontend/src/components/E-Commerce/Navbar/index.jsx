import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { navItems } from "./navItems";
import MenuItems from "./Hamburger/MenuItems";
import { Input } from "../../ui/input";

const toggleMenu = {
  open: {
    clipPath: "circle(1000px at calc(100% - 40px) 40px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
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

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        toggleOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleOpen]);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            TOKO.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-64 hidden md:block px-4 py-2"
            />
            <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer" />
            <User className="w-6 h-6 text-gray-700 cursor-pointer" />
            {isMobile && (
              <button
                onClick={() => toggleOpen()}
                className="p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
                  transition={{ duration: 0.4 }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6 text-gray-800" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-800" />
                  )}
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={toggleMenu}
      >
        <motion.ul
          className="p-4"
          variants={{
            open: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            },
            closed: {
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItems
              key={item.name}
              name={item.name}
              href={item.path}
              icon={item.icon}
              onClick={() => toggleOpen(false)}
            />
          ))}
        </motion.ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
