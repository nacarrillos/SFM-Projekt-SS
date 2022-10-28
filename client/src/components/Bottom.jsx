import React from "react";
import "./Bottom.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";



//Fußzeile als Komponente
const Bottom = () => {
 return (
    <div className="main-footer">
      <Container className="ContainerBottom">
        <Row>
          <Col>
            <img
              src="/images/logoNeuWhite.png"
              alt="Wooden Valley Logo"
              height="55"
              className="d-inline-block align-top"
            />
          </Col>
          <Col xs={3}>
            <p>WoodenValley gGmbH</p>
            
            In Verantwortungseigentum
            <br/> 
            Quellenstraße 7a
            <br/> 
            70376 Stuttgart
            
          </Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col xs={3}>Als gemeinnütziges Unternehmen in Verantwortungseigentum nehmen wir das Cradle 2 Cradle Prinzip als Leitmotiv für unsere Vorhaben und stellen damit die Klimapositivität in den Mittelpunkt all unserer Handlungen.</Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className="justify-content-md-center">
          © 2022 WoodenValley gGmbH | Datenschutz | Impressum
        </Row>

      </Container>
    </div>
  );
};

export default Bottom;

