import React, { useContext, useState } from "react";
import PathFinder from "../apis/PartFinder";
import { useParams } from "react-router-dom";
import { BauteilContext } from "../context/BauteilContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { getBenutzerTyp } from "../apis/AuthFinder";
import "../styles/BauteilOptionen.css";
import { Download, List  } from 'react-bootstrap-icons';



const BauteilOptionen = () => {
  const { teilenummer } = useParams();
  //isAuth aus dem State des Browsers wird gelesen, um die Anthentifizierung eines Benutzers danach zu prüfen
  const { isAuth } = useSelector((state) => state.auth);

  //Context für Historie & UserData zu lesen
  const { historie, setHistorie } = useContext(BauteilContext);
  const { userData } = useContext(BauteilContext);

  //function um die Historie eines Bauteiles aus Backend zu lesen und in Variable newHistorie zu setzen
  const getHistorie = async () => {
    try {
      const response = await PathFinder.get(`/aufbau/aussenwand/${teilenummer}/historie`);
      const historie = response.data.data.historie;

      console.log(historie);

      let newHistorie = historie.map((aufgabe) => {
        let datumauspostgres = new Date(aufgabe.aufgabe_abschlussdatum);
        let abschlussdatum = [
          datumauspostgres.getDate(),
          datumauspostgres.getMonth() + 1,
          datumauspostgres.getFullYear(),
        ].join(".");
        aufgabe.aufgabe_abschlussdatum = abschlussdatum;
        return aufgabe;
      });

      setHistorie(newHistorie);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Variable Boolean, sodass Historie auf Rendering auf oder zu ist
  const [open, setOpen] = useState(false);

  //function, um das auf/zumachen der Historie zu setzen
  const historieHandler = () => {
    getHistorie();
    setOpen(!open);
  };


  //function, um einen Datei-Download zu realisieren

  function donwloadHandler(value){

    console.log ("testdownload", value)

    switch(value){

      

      case "bild":
        console.log("bild")
        break;
      
      case "zeichnung":
        console.log("zeichnung")
        break;

      case "montage":
        console.log("montage")
        break;

      case "reparatur":
        console.log("reparatur")
        break;

    
    }

  }

  //React Bootstrap bzw. HTML Code für das Ansehen der Information einer Historie
  return (
    <Container className="" md="auto">
      <Row className="">
        {isAuth && userData.benutzertyp === "Handwerker" ? (
        <>
          <Card className="mobilAdjustmentOptionen ">
            <Card.Header className="text-center border" as="h4">
                  Bauteiloptionen
                </Card.Header>
              <Card.Body className="p-2 " >
                <Card.Text className="pb-0 " >
                  <div className="innerCardText">
                  <Row>

                    <Col>
                      <Button
                        onClick={donwloadHandler("bild")}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen ">
                         <Download color="white" size={17} /> Bauteilbild
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={donwloadHandler("zeichnung")}
                        aria-controls="historie-collapse-component"
                        aria-expanded={open}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen ">
                         <Download color="white" size={17} /> Zeichnung
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={donwloadHandler("montage")}
                        aria-controls="historie-collapse-component"
                        aria-expanded={open}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen">
                         <Download color="white" size={17} /> Montage
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={donwloadHandler("reparatur")}
                        aria-controls="historie-collapse-component"
                        aria-expanded={open}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen">
                         <Download color="white" size={17} />  Reparatur
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={""}
                        aria-controls="historie-collapse-component"
                        aria-expanded={open}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen">
                        tbd
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={historieHandler}
                        aria-controls="historie-collapse-component"
                        aria-expanded={open}
                        variant="secondary"
                        size="md"
                        className="buttonOptionen"
                      >
                         <List color="white" size={17} />Historie
                      </Button> 
                    </Col>
                  </Row>
        <Row className="rowTableContentHistorie">
        
          <Collapse in={open} className="p-0">
            <div id="historie-collapse-component">
              <Table striped bordered hover className="tableContentHistorie mb-3">
                <thead>
                  <tr className="big-primary">
                    <th scope="col">Typ</th>
                    <th scope="col">Beschreibung</th>
                    <th scope="col">Fertigstellungsdatum</th>
                  </tr>
                </thead>
                <tbody>
                  {historie &&
                    historie.map((aufgabe) => {
                      return (
                        <tr key={aufgabe.id}>
                          <td>{aufgabe.aufgabe_typ}</td>
                          <td>{aufgabe.aufgabe_beschreibung}</td>
                          <td>{aufgabe.aufgabe_abschlussdatum}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Collapse>
        </Row>
        </div>
                  </Card.Text>
                </Card.Body>
              </Card>
        </>):(<></>)}
        
      </Row>
    </Container>
  );
};

export default BauteilOptionen;
/*
<Col>
<Button             
  onClick={""}
  variant="secondary"
  size="md"
  className="buttonOptionen ">
  Grundrissinformationen
</Button>
</Col>
<Col>
<Button 
  onClick={""}
  aria-controls="historie-collapse-component"
  aria-expanded={open}
  variant="secondary"
  size="md"
  className="buttonOptionen ">
  Reparaturinformationen
</Button>
</Col>
<Col>
<Button 
  onClick={""}
  aria-controls="historie-collapse-component"
  aria-expanded={open}
  variant="secondary"
  size="md"
  className="buttonOptionen">
  Montageinformationen
</Button>
      
</Col>

*/