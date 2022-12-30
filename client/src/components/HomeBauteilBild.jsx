import React  from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/HomeBaurppenBild.css";

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const HomeBauteilBild = (props) => {
  

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
    <Container className="square border border-1 rounded-3 pt-2 px-3 " sm="auto">
      <Card className="" >
        <Card.Img variant="top" src="/images/Fussboden2.png" className="HomeBaurppenBild"/>
        <Card.Body>
          <Card.Title>Bauteil-Beschreibung</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
   
    </Container>
  );
};

export default HomeBauteilBild;
