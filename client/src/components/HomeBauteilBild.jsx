import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathFinder from "../apis/PartFinder";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "../styles/HomeBauteilBild.css";

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const HomeBauteilBild = (props) => {
  //lies die ID aus dem Route URL
  const { teilenummer } = useParams();
  //nimmt die Variable Bauteilinformation aus dem Context  ohne Werte
  const { bauteil, setBauteil } = useContext(BauteilContext);
  console.log("TEst1", teilenummer);

  //function um auf dem Backend die Information eines Bauteiles mit dem ID zu lesen und in dem Context zu setzen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PathFinder.get(
          `/aufbau/aussenwand/${teilenummer}`
        );
        setBauteil(response.data.data.bauteil[0]);
        console.log("TEst3", teilenummer);
        console.log("TEst4", response.data.data.bauteil[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
    <Container className="" sm="auto">
      <Row>
        <Card className="mobilAdjustmentBild">
          <Card.Img
            className="HomeBauteilBild"
            variant="top"
            alt="/images/Haus/TinyHouse.png"
            src={bauteil.bauteil_bild}
          />
        </Card>

        <Card className="mobilAdjustment">
          <Card.Header className="text-center border" as="h4">
            Bauteilbeschreibung
          </Card.Header>
          <Card.Body className="p-2 ">
            <Card.Text className="pb-0">
              {/* {'Ich wollte die Nachricht in einem Array speicher und die einzelen Komonenten ancheinader ausgeben->> bessere Darstellung als reiner text'}
            {'{bauteil.bauteil_beschreibung[0]}'}
            {'{bauteil.bauteil_beschreibung[1]}'}
            {'{bauteil.bauteil_beschreibung[2]}'}
             */}
              <p>{bauteil.bauteil_beschreibung}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default HomeBauteilBild;
