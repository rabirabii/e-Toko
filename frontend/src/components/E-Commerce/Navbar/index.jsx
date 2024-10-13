import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { navItems } from "./navItems";
import MenuItems from "./Hamburger/MenuItems";
import { Input } from "../../ui/input";
import StaggeredHeroes from "../StaggeredHeroes";
import HamburgerMenu from "./Hamburger/HamburgerMenu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <nav className="shadow-md relative z-50 ">
      <div className="bg-black text-white text-center py-2 text-sm">
        Sign up and get 20% off to your first order.{" "}
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="max-w-frame mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-integral">
            RABI.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.path} className="">
                  <StaggeredHeroes className="text-gray-700 hover:text-gray-900 font-medium">
                    {item.name}
                  </StaggeredHeroes>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full hidden md:block px-4 py-2"
            />
            <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer" />
            <User className="w-6 h-6 text-gray-700 cursor-pointer" />
            {isMobile && (
              <HamburgerMenu isOpen={isOpen} toggleOpen={() => toggleOpen()} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
