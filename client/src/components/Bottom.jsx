import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//Fußzeile als Komponent
const Bottom = () => {
  return (
    <Navbar bg="dark" sticky="bottom" className="p-0 mt-2">
      <Container fluid>
        <Row className="d-flex py-2 w-100 align-items-center justify-content-center">
          <h6 className="font-weight text-white text-center vertical-align-middle">
            @2022 Copyright
          </h6>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Bottom;
