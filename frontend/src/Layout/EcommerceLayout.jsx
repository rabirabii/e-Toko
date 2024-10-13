import React from "react";
import Navbar from "../components/E-Commerce/Navbar";

const EcommerceLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default EcommerceLayout;
