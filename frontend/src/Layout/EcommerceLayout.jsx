import React from "react";
import Navbar from "../components/E-Commerce/Navbar";

const EcommerceLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="px-4 mx-8">{children}</div>
    </div>
  );
};

export default EcommerceLayout;
