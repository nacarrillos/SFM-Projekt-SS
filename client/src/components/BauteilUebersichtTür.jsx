import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquareFill  } from 'react-bootstrap-icons';

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BauteilUebersichtTür = (props) => {

  let navigate = useNavigate();

  const handleSuche = (e) => {
    e.preventDefault();
    try {
      if(e.target.textContent === "tbd") {
        navigate(`/aufbau/aussenwand`);
      } else if (e.target.textContent === "tbd") {
          navigate(`/aufbau/innenwand`);
      } else if (e.target.textContent === "tbd") {
          navigate(`/aufbau/fußboden`);
      } else if(e.target.textContent === "tbd") {
          navigate(`/aufbau/dach`);
      }  else if (e.target.textContent === " Bauteile Tür") {
        navigate(`/aufbau/tuer`);
      } else {}
      
    } catch (err) {
      console.error(err.message);
    }
  };

 

  //React Bootstrap bzw. HTML Code für das Ansehen der Information eines Bauteiles
  return (
      <Row className="mx-0">
        <Col>
          <Card className="h-100 mx-1">
            <Card.Header className="text-center border" as="h4">
              Einzelteile
            </Card.Header>
            <Card.Body className="p-0 ">
            <ListGroup className="rounded-0 ">
              
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.001 - Zarge
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.002 - Türblatt
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.003 - Drückergarnitur
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.004 - Schlosskasten
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.005 - Schließblech
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.006 - Türband
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.06.666.007 - Schlossrosette
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
              <ArrowLeftSquareFill color="grey" size={22} /> Bauteile Tür
              </ListGroup.Item>


            </ListGroup>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default BauteilUebersichtTür;
