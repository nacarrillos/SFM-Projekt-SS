import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathFinder from "../apis/PartFinder";
import { BauteilContext } from "../context/BauteilContext";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

import "../styles/BauteilInfo.css";

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BauteilBezeichnung = (props) => {
  //lies die ID aus dem Route URL
  const { id } = useParams();
  //nimmt die Variable Bauteilinformation aus dem Context  ohne Werte
  const { bauteil, setBauteil } = useContext(BauteilContext);

  //function um auf dem Backend die Information eines Bauteiles mit dem ID zu lesen und in dem Context zu setzen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PathFinder.get(`/${id}`);
        setBauteil(response.data.data.bauteil[0]);
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
    <Container className="" sm="auto">
      <Row >
        <Card className="mobilAdjustmentBezeichnung">
          <Card.Header className="text-center border" as="h4">
            Bauteil: {bauteil.bauteil_name}
          </Card.Header>
        </Card>
      </Row>
    </Container>
  );
};

export default BauteilBezeichnung;
