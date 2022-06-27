import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathFinder from "../apis/PartFinder";
import { BauteilContext } from "../context/BauteilContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const BauteilInfo = (props) => {
  const { id } = useParams();

  const { bauteil, setBauteil } = useContext(BauteilContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PathFinder.get(`/${id}`);
        setBauteil(response.data.data.bauteil[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="shadow border border-light p-1 w-3" sm="auto">
      <Row className="d-flex py-2">
        <h1 className="text-center">{bauteil.bauteil_name}</h1>
      </Row>
      <Row>
        <Col>
          <Card className="h-100 mx-1">
            <Card.Header className="text-center" as="h3">
              Beschreibung
            </Card.Header>
            <Card.Body>
              <p className="text-justify fs-3">
                {bauteil.bauteil_beschreibung}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mx-1">
            <Card.Header className="text-center" as="h3">
              Bild
            </Card.Header>
            <Card.Img
              className="p-1"
              alt={bauteil.bauteil_name}
              variant="bottom"
              src={bauteil.bauteil_bild}
            ></Card.Img>
          </Card>
        </Col>
      </Row>
    </Container>

    // <div className="container-md border border-primary pt-2 mt-5">
    //   <div className="row mb-3">
    //     {/* Div Bauteilname */}
    //     <div className="border-bottom border-primary text-center">
    //       {bauteil.bauteil_name}
    //     </div>
    //     <div className="row">
    //       {/* Div Beschreibung */}
    //       <div className="col ">{bauteil.bauteil_beschreibung}</div>
    //       {/* Div Bild */}
    //       <div className="col text-center">{bauteil.bauteil_bild}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BauteilInfo;
