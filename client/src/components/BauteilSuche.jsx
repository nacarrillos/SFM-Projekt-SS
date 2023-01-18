import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const BauteilSuche = () => {
  const [bauteileTNorID, setBauteileTNorID] = useState("");
  const [type, setType] = useState("TN");
  //definition von navigate, um auf einem URL zu gehen
  let navigate = useNavigate();

  //Wokraround für komplexe navigation, richtige Suche muss auf Datenbank gemacht werden mit neuer Route
  const urls = {
    "01.01.001": "aufbau/aussenwand",
    "01.01.002": "aufbau/aussenwand",
    "01.01.003": "aufbau/aussenwand",
    "01.01.004": "aufbau/aussenwand",
    "01.02.001": "aufbau/innenwand",
    "01.02.002": "aufbau/innenwand",
    "01.02.003": "aufbau/innenwand",
    "01.02.004": "aufbau/innenwand",
    "01.03.001": "aufbau/fussboden",
    "01.03.002": "aufbau/fussboden",
    "01.03.003": "aufbau/fussboden",
    "01.03.004": "aufbau/fussboden",
    "01.04.001": "aufbau/dach",
    "01.04.002": "aufbau/dach",
    "01.04.003": "aufbau/dach",
    "01.04.004": "aufbau/dach",
    "01.05.001": "aufbau/fenster",
    "01.05.002": "aufbau/fenster",
    "01.05.005": "aufbau/fenster",
    "01.05.004": "aufbau/fenster",
    "01.06.001": "aufbau/tuer",
    "01.06.002": "aufbau/tuer",
    "01.06.003": "aufbau/tuer",
    "01.06.004": "aufbau/tuer",
  };

  //Function um Aktionen des Endbenutzers auf dem Suchfeld zu steuern, beim Click auf Suche wird das Bauteil ID gesucht.
  const handleSuche = (e, input) => {
    e.preventDefault();
    try {
      if (input !== "") {
        if (type === "TN") {
          navigate(`${urls[input]}/${input}`);
        } else if (type === "ID") {
          navigate(`/bauteil/${input}`);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //React Bootstrap bzw. HTML Code für das Ansehen der suchfeld für Bauteile auf dem Home
  return (
    <Row className="mx-0 mt-0 mb-4">
      <Col>
        <Card className="h-100 mx-1 ">
          <Card.Header className="text-center border" as="h4">
            Teilesuche
          </Card.Header>
          <Card.Body className="pt-4 ">
            <Row mx-2 md={3}>
              <Col className="mb-2">
                <Form.Group controlId="formGridState">
                  <Form.Select
                    size="md"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="TN">Bauteil TN</option>
                    <option value="ID">Bauteil ID</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col /**/ className="mb-2">
                <Form.Control
                  size="md"
                  value={bauteileTNorID}
                  onChange={(e) => setBauteileTNorID(e.target.value)}
                  type="text"
                  placeholder="Teilenummer"
                  required
                />
              </Col>
              <Col sm={1} className="mb-2">
                <Button
                  onClick={(e) => handleSuche(e, bauteileTNorID)}
                  type="submit"
                  className="btn btn-primary"
                  size="md"
                >
                  Suchen
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BauteilSuche;
