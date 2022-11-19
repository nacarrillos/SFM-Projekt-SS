import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const BauteilSuche = () => {
  const [bauteilId, setBauteilId] = useState("");
  //definition von navigate, um auf einem URL zu gehen
  let navigate = useNavigate();

  //Function um Aktionen des Endbenutzers auf dem Suchfeld zu steuern, beim Click auf Suche wird das Bauteil ID gesucht.
  const handleSuche = (e, id) => {
    e.preventDefault();
    try {
      if (bauteilId !== "") {
        navigate(`/bauteil/${id}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //React Bootstrap bzw. HTML Code für das Ansehen der suchfeld für Bauteile auf dem Home
  return (
    <Container>
      <Row className="justify-content-md-center" md={2}>
        <Form>
          <Form.Group className="my-4" controlId="ControlId">
            <Row className="d-flex justify-content-center align-items-center">
              <Col /**/className="mb-2">
                <Form.Control
                  size="lg"
                  value={bauteilId}
                  onChange={(e) => setBauteilId(e.target.value)}
                  type="number"
                  placeholder="Enter BauteilID"
                  required
                />
              </Col>
              <Col sm={1} className="mb-2">
                <Button
                  onClick={(e) => handleSuche(e, bauteilId)}
                  type="submit"
                  className="btn btn-primary"
                  size="lg"
                >
                  Suchen
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default BauteilSuche;
