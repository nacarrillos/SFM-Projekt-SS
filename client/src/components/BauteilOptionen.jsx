import React, { useContext, useState } from "react";
import PathFinder from "../apis/PartFinder";
import { useParams } from "react-router-dom";
import { BauteilContext } from "../context/BauteilContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const BauteilOptionen = () => {
  const { id } = useParams();
  const { isAuth } = useSelector((state) => state.auth);

  const { historie, setHistorie } = useContext(BauteilContext);
  const { userData } = useContext(BauteilContext);
  console.log(userData);

  const getHistorie = async () => {
    try {
      const response = await PathFinder.get(`/${id}/historie`);
      const historie = response.data.data.historie;

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

  const [open, setOpen] = useState(false);

  const historieHandler = () => {
    getHistorie();
    setOpen(!open);
  };

  return (
    <Container className="shadow border border-light p-1 mt-3" md="auto">
      <Row className="my-3 mx-2">
        <Col>
          <Button
            onClick={historieHandler}
            aria-controls="historie-collapse-component"
            aria-expanded={open}
            variant="secondary"
            size="lg"
          >
            Historie
          </Button>
        </Col>
        <Col>
          {isAuth && userData.benutzetyp !== "undefined" ? (
            <Button>Funtion 2</Button>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="mx-2 my-1">
        <Container>
          <Collapse in={open}>
            <div id="historie-collapse-component">
              <Table striped bordered hover>
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
        </Container>
      </Row>
    </Container>

    // <Container className="shadow border border-light p-1 mt-3" md="auto">
    //   <Row>
    //     <Col>
    //       <Accordion>
    //         <Accordion.Item eventKey="0">
    //           <Accordion.Header
    //             variant="secondary"
    //             className="mb-4 mr-2"
    //             onClick={getHistorie}
    //           >
    //             Historie
    //           </Accordion.Header>
    //           <Accordion.Body>
    //             <Table striped bordered hover>
    //               <thead>
    //                 <tr className="big-primary">
    //                   <th scope="col">Typ</th>
    //                   <th scope="col">Beschreibung</th>
    //                   <th scope="col">Fertigstellungsdatum</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {historie &&
    //                   historie.map((aufgabe) => {
    //                     return (
    //                       <tr key={aufgabe.id}>
    //                         <td>{aufgabe.aufgabe_typ}</td>
    //                         <td>{aufgabe.aufgabe_beschreibung}</td>
    //                         <td>{aufgabe.aufgabe_abschlussdatum}</td>
    //                       </tr>
    //                     );
    //                   })}
    //               </tbody>
    //             </Table>
    //           </Accordion.Body>
    //         </Accordion.Item>
    //       </Accordion>
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
  );
};

export default BauteilOptionen;
