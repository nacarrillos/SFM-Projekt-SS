import React  from "react";
import Container from "react-bootstrap/Container";

import "../styles/HomeBaurppenBild.css";

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const HomeBaugruppenBild = (props) => {
  

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
    <Container className="mobilAdjustment" sm="auto">
      <img 
          src="/images/Haus/TinyHouse.png"
          className="HomeBaurppenBild"
          
          
        />
   
    </Container>
  );
};

export default HomeBaugruppenBild;
