import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquareFill  } from 'react-bootstrap-icons';

//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BauteilUebersichtDach = (props) => {

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
      }  else if (e.target.textContent === " Bauteile Dach") {
        navigate(`/aufbau/dach`);
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
                01.04.444.001 - Sparren
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.04.444.002 - Dampfsperre
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.04.444.003 - Dämmung
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.04.444.004 - Witterungsschutz
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.04.444.005 - Dachlatte
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.04.444.006 - Dachziegel
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
              <ArrowLeftSquareFill color="grey" size={22} /> Bauteile Dach
              </ListGroup.Item>


            </ListGroup>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default BauteilUebersichtDach;
