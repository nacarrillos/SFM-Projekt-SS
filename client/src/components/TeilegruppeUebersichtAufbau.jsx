import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquareFill  } from 'react-bootstrap-icons';


//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const TeilegruppeUebersichtAufbau = (props) => {

  let navigate = useNavigate();

  const handleSuche = (e) => {
    e.preventDefault();
    console.log(e.target.textContent)
    
    try {
      if(e.target.textContent === "01.01 - Außenwand") {
        navigate(`/aufbau/aussenwand`);
      } else if (e.target.textContent === "01.02 - Innenwand") {
          navigate(`/aufbau/innenwand`);
      } else if (e.target.textContent ===  "01.03 - Fußboden") {
          navigate(`/aufbau/fußboden`);
      } else if(e.target.textContent === "01.04 - Dach") {
          navigate(`/aufbau/dach`);
      } else if (e.target.textContent === "01.05 - Fenster") {
          navigate(`/aufbau/fenster`);
      } else if (e.target.textContenta === "01.06 - Tür") {
          navigate(`/aufbau/tür`);
      }  else if (e.target.textContent === " Baugruppen") {
        navigate(`/`);
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
              Teilegruppen
            </Card.Header>
            <Card.Body className="p-0 ">
            <ListGroup className="rounded-0 ">
              
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                01.01 - Außenwand
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                 01.02 - Innenwand
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                  01.03 - Fußboden
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                  01.04 - Dach
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                  01.05 - Fenster
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                  01.06 - Tür
              </ListGroup.Item>
              <ListGroup.Item action onClick={(e) => handleSuche(e)}>
                <ArrowLeftSquareFill color="grey" size={22} /> Baugruppen
              </ListGroup.Item>


            </ListGroup>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default TeilegruppeUebersichtAufbau;
