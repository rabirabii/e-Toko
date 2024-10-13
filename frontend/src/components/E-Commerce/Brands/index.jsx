import React from "react";
import { motion } from "framer-motion";

const brands = [
  {
    id: 1,
    src: "/icons/Kenzo.svg",
  },
  {
    id: 2,
    src: "/icons/gucci.svg",
  },
  {
    id: 3,
    src: "/icons/Louis.svg",
  },
  {
    id: 4,
    src: "/icons/Nike.svg",
  },
  {
    id: 5,
    src: "/icons/Converse.svg",
  },
];

const Brands = () => {
  const scrollSpeed = 10;
  return (
    <div className="bg-[#ecebec] overflow-hidden ">
      <motion.div
        className="mx-auto flex items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: scrollSpeed,
            ease: "linear",
          },
        }}
      >
        {brands.map((brand) => (
          <motion.img
            key={brand.id}
            src={brand.src}
            className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9 my-5 md:my-11"
            alt={`Brand logo ${brand.id}`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Brands;
