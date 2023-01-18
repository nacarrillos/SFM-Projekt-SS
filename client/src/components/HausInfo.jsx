import { useContext, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import { BauteilContext } from "../context/BauteilContext";
import PathFinder from "../apis/PartFinder";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { useState } from "react";

const HausInfo = () => {
  const { id } = useParams();
  //nimmt die Variable Bauteilinformation aus dem Context  ohne Werte
  const { haus, setHaus } = useContext(BauteilContext);
  const [besitzerInfo, setBesitzerInfo] = useState("");

  //function um auf dem Backend die Information eines Bauteiles mit dem ID zu lesen und in dem Context zu setzen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PathFinder.get(`/${id}/haus`);
        setHaus(response.data.data.haus[0]);
        setBesitzerInfo(response.data.data.besitzer);
        console.log(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="mobilAdjustmentOptionen ">
      <Card.Header className="text-center border" as="h4">
        Haus Information
      </Card.Header>
      <Card.Body className="d-flex p-2 place-items-center">
        <Col flex className="px-1 " md={3}>
          <Card.Title>Baujahr </Card.Title>
          <Card.Text>{haus.baujahr}</Card.Text>
        </Col>
        <Col flex className="px-1 " md={6}>
          <Card.Title>Adresse </Card.Title>{" "}
          <Card.Text>{haus.adresse}</Card.Text>
        </Col>
        <Col flex className="px-1 ">
          <Card.Title>Besitzer </Card.Title>
          <Card.Text> {besitzerInfo}</Card.Text>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default HausInfo;
