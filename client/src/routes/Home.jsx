import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";

const Home = () => {
  const { userData } = useContext(BauteilContext);
  return (
    <div className="container">
      <div>
        <h1>Hallo {userData.benutzername}</h1>
      </div>
      <div>
        <BauteilSuche />
      </div>
    </div>
  );
};

export default Home;
