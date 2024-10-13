import React, { useState } from "react";

const CustomButton = ({
  children,
  backgroundColor = "#000",
  color = "#fff",
  hoverColor = "#000",
  className = "",
  ...attributes
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`${className}`}>
      <button
        className="relative px-12 py-4 border border-gray-400 rounded-full cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: "color 0.3s ease",
          color: isHovered ? hoverColor : color,
        }}
        {...attributes}
      >
        <p className="relative z-10">{children}</p>
        <div
          className="absolute inset-0"
          style={{
            backgroundColor,
            transition: "transform 0.4s ease",
            transform: `translateY(${isHovered ? "0%" : "100%"})`,
          }}
        />
      </button>
    </div>
  );
};

export default CustomButton;
