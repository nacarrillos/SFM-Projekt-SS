import React, { useContext } from "react";
import BauteilSuche from "../components/BauteilSuche";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/esm/Container";
import "../styles/Body.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../styles/BaugruppenUebersicht.css";

import TeilegruppeUebersichtAufbau from "../components/TeilegruppeUebersichtAufbau";
import HomeBaugruppenBild from "../components/HomeBaugruppenBild";

//Homes des Websites URL
const HomeTeilegruppeAufbau = () => {
  const { userData } = useContext(BauteilContext);
  console.log(userData.benutzername);
  return (
    <Container fluid className="bodyContainer">
      <div>
        <h1 className="text-center mb-4">
          Herzlich Willkommen {userData.benutzername} !
        </h1>
      </div>
      <Row className="rowContainer">
        <Col fluid className="px-0">
          <HomeBaugruppenBild />
        </Col>
        <Col className="px-0">
          <TeilegruppeUebersichtAufbau />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeTeilegruppeAufbau;
