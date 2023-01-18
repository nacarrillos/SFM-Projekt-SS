import React from "react";
import BauteilInfo from "../components/BauteilInfo";
import BauteilOptionen from "../components/BauteilOptionen";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import HausInfo from "../components/HausInfo";
import Row from "react-bootstrap/esm/Row";

//Bauteil Information (aus einem ID) URL
const BauteilHome = () => {
  return (
    <Container fluid className="d-flex bodyContainer px-3">
      <Col flex className="px-1 " md={6}>
        <BauteilInfo />
      </Col>
      <Col className="px-1" md={6}>
        <HausInfo />
        <BauteilOptionen />
      </Col>
    </Container>
  );
};

export default BauteilHome;
