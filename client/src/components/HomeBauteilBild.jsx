import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathFinder from "../apis/PartFinder";
import { BauteilContext } from "../context/BauteilContext";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/HomeBaurppenBild.css";

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const HomeBauteilBild = (props) => {

    //lies die ID aus dem Route URL
    const { teilenummer } = useParams();
    //nimmt die Variable Bauteilinformation aus dem Context  ohne Werte
    const { bauteil, setBauteil } = useContext(BauteilContext);
    console.log("TEst1",teilenummer)

    //function um auf dem Backend die Information eines Bauteiles mit dem ID zu lesen und in dem Context zu setzen
      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await PathFinder.get(`/aufbau/aussenwand/${teilenummer}`);
          setBauteil(response.data.data.bauteil[0]);
          console.log("TEst3", teilenummer)
          console.log("TEst4",response);
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchData();
    }, []);



  

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
    <Container className="square border border-1 rounded-3 pt-2 px-3 " sm="auto">
      <Card className="" >
        <Card.Img 
          className="HomeBaurppenBild"
          variant="top" 
          alt="/images/Haus/TinyHouse.png"
          src={bauteil.bauteil_bild}/>
        <Card.Body>
          <Card.Title>Bauteil-Beschreibung</Card.Title>
          <Card.Text>
            {bauteil.bauteil_beschreibung}
          </Card.Text>
        </Card.Body>
      </Card>
   
    </Container>
  );
};

export default HomeBauteilBild;
