import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/esm/Container";
import "../styles/Body.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BauteilAußenwandUebersicht from "../components/BauteilAußenwandUebersicht";
import BauteilBezeichnung from "../components/BauteilBezeichnung";
import HomeBauteilBild from "../components/HomeBauteilBild";



//Homes des Websites URL
const HomeBauteilAußenwand = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    
    <Container fluid className="bodyContainer">
      <div>
        <h1 className="text-center mb-4">Herzlich Willkommen {userData.benutzername} !</h1>
      </div>
      <Row className="mb-2">
        <Col className="pe-0">
          <BauteilBezeichnung/>
        </Col>
      </Row>
      <Row>
        
        <Col><HomeBauteilBild/></Col>
        <Col className="square border border-1 rounded-3 p-1">
          <BauteilSuche/>
          
          <BauteilAußenwandUebersicht/>
          
        
        </Col>
      



      </Row>

      
      
    </Container>
  );
};

export default HomeBauteilAußenwand;
