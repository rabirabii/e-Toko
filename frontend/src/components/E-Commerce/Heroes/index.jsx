import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import AnimatedCounter from "../../../lib/AnimatedCounter";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "../../../components/ui/separator";
const Heroes = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const logos = [
    "/icons/Kenzo.svg",
    "/icons/gucci.svg",
    "/icons/Louis.svg",
    "/icons/Nike.svg",
    "/icons/Converse.svg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const LogoAnimation = ({ className }) => (
    <AnimatePresence mode="wait">
      <motion.img
        key={currentLogoIndex}
        src={logos[currentLogoIndex]}
        height={104}
        width={104}
        className={`max-w-[76px] max-h-[76px] lg:max-w-24 lg:max-h-max-w-24 xl:max-w-[104px] xl:max-h-[104px] ${className}`}
        alt={`Brand logo ${currentLogoIndex + 1}`}
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
  return (
    <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden">
      <main className="container md:max-w-frame px-4 py-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="max-w-frame px-4">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-5xl font-bold mb-4 lg:leading-[64px] lg:mb-8 font-integral"
          >
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </motion.h2>
          <p className="text-gray-600 mb-6 text-md lg-text-base lg:mb-8 max-w-[500px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <CustomButton
              backgroundColor="#000"
              color="#000"
              hoverColor="#fff"
              className="inline-block mb-5 md:mb-12"
            >
              <p>Shop Now</p>
            </CustomButton>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={200} />+
              </span>
              <p className="text-xs xl:text-base text-black/60 text-nowrap">
                International Brands
              </p>
            </div>
            <Separator
              orientation="vertical"
              className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
            />
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={2000} />+
              </span>
              <p className="text-xs xl:text-base text-black/60 text-nowrap">
                High-Quality Products
              </p>
            </div>
            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={3000} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Happy Customers
              </span>
            </div>
          </motion.div>
        </div>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-homepage.png')] md:bg-[url('/images/header-homepage.png')]"
        >
          <div className="absolute right-7 xl:right-0 top-12">
            <LogoAnimation />
          </div>
          <div className="absolute hidden sm:block left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56">
            <LogoAnimation className="delay-120" />
          </div>
        </motion.section>
      </main>
    </header>
  );
};

export default Heroes;
