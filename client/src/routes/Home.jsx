import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/esm/Container";
import "../App.css";

//Homes des Websites URL
const Home = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    <Container fluid className="siteContainer">
      <div>
        <h1 className="text-center">Hierbei handelt es sich um eine Website im Rahmen eines
        Studienprojekts der Hochschule Esslingen {userData.benutzername}</h1>
      </div>
      <div>
        <BauteilSuche />
      </div>
    </Container>
  );
};

export default Home;
