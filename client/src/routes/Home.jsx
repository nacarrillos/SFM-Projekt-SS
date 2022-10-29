import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";

//Homes des Websites URL
const Home = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    <div className="container">
      <div>
        <h1 className="text-center">Hierbei handelt es sich um eine Website im Rahmen eines
        Studienprojekts der Hochschule Esslingen {userData.benutzername}</h1>
      </div>
      <div>
        <BauteilSuche />
      </div>
    </div>
  );
};

export default Home;
