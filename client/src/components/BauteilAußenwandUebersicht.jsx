import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquareFill  } from 'react-bootstrap-icons';

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BauteilAußenwandUebersicht = (props) => {

  let navigate = useNavigate();

  const handleSuche = (e) => {
    e.preventDefault();
    try {
      if(e.target.textContent === "01.01.017 - Außenwand 1") {
        navigate(`/aufbau/aussenwand`);
      } else if (e.target.textContent === "01.01.018 - Außenwand 2") {
          navigate(`/aufbau/innenwand`);
      } else if (e.target.textContent === "01.01.018 - Außenwand 3") {
          navigate(`/aufbau/fußboden`);
      } else if(e.target.textContent === "01.01.018 - Außenwand 4") {
          navigate(`/aufbau/dach`);
      }  else if (e.target.textContent === " Bauteile Außenwand") {
        navigate(`/aufbau/aussenwand`);
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
                01.01.017.001 - Holzfassade
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.01.017.002 - Lattung
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.01.017.003 - Unterdeckplatte
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
              <ArrowLeftSquareFill color="grey" size={22} /> Bauteile Außenwand
              </ListGroup.Item>


            </ListGroup>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default BauteilAußenwandUebersicht;
