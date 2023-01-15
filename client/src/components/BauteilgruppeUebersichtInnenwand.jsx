import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquareFill  } from 'react-bootstrap-icons';


//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BauteilgruppeUebersichtInnenwand = (props) => {

  let navigate = useNavigate();

  const handleSuche = (e) => {
    e.preventDefault();
    try {
      if(e.target.textContent === "01.02.001 - Innenwand") {
        navigate(`/aufbau/innenwand/01.02.001`);
      } else if (e.target.textContent === "01.02.002 - Innenwand mit Fensterausschnitt") {
          navigate(`/aufbau/innenwand/01.02.002`);
      } else if (e.target.textContent === "01.02.003 - Innenwand mit Durchgang") {
          navigate(`/aufbau/innenwand/01.02.003`);
      } else if(e.target.textContent === "01.02.004 - Innenwand 4") {
          navigate(`/aufbau/innenwand/01.02.004`);
      }  else if (e.target.textContent === " Teilegruppen") {
        navigate(`/aufbau`);
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
              Bauteile Innenwand
            </Card.Header>
            <Card.Body className="p-0 ">
            <ListGroup className="rounded-0 ">
              
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.02.001 - Innenwand
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
              01.02.002 - Innenwand mit Fensterausschnitt
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
              01.02.003 - Innenwand mit Durchgang
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.02.004 - Innenwand 4
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                <ArrowLeftSquareFill color="grey" size={22} /> Teilegruppen
              </ListGroup.Item>


            </ListGroup>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default BauteilgruppeUebersichtInnenwand;
