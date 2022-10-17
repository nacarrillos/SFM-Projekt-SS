import React from "react";
import BauteilInfo from "../components/BauteilInfo";
import BauteilOptionen from "../components/BauteilOptionen";

//Bauteil Information (aus einem ID) URL
const BauteilHome = () => {
  return (
    <div className="container">
      <div>
        <div>
          <BauteilInfo />
        </div>
        <div>
          <BauteilOptionen />
        </div>
      </div>
    </div>
  );
};

export default BauteilHome;
