import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";

const Home = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    <div className="container">
      <div>
        <h1 className="text-center">Hallo {userData.benutzername}</h1>
      </div>
      <div>
        <BauteilSuche />
      </div>
    </div>
  );
};

export default Home;
