import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/esm/Container";
import "../styles/Body.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BauteilUebersichtDach from "../components/BauteilUebersichtDach";
import BauteilBezeichnung from "../components/BauteilBezeichnung";
import HomeBauteilBild from "../components/HomeBauteilBild";
import BauteilOptionen from "../components/BauteilOptionen";
import "../styles/BaugruppenUebersicht.css";



//Homes des Websites URL
const HomeBauteilDach = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    
    <Container fluid className="bodyContainer">
      <div>
        <h1 className="text-center mb-4">Herzlich Willkommen {userData.benutzername} !</h1>
      </div>
      <Row className="rowContainer">
        <Col flex className="px-1 ">
          <BauteilBezeichnung/>
          <HomeBauteilBild/>

        </Col>
                
        <Col className="px-0">
          <BauteilOptionen/>
          <BauteilSuche/>
          
          <BauteilUebersichtDach/>
          
        
        </Col>
      </Row>

    </Container>
  );
};

export default HomeBauteilDach;
