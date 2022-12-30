import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/BauteilInfo.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';


//Function, um Information eines Bauteiles aus dem Backend zu lesen und zu Render mit dem React Bootstrap
const BaugruppenUebersicht = (props) => {

  let navigate = useNavigate();

  const handleSuche = (e) => {
    e.preventDefault();
    console.log(e.target.textContent)
    try {
        
        if(e.target.textContent === "01 - Aufbau1") {
          navigate(`/aufbau`);
        } else if (e.target.textContent ==="02 - Innenausbau2") {
            navigate(`/innenausbau`);
        } else if (e.target.textContent === "03 - Stromversorgung3") {
            navigate(`/stromversorgung`);
        } else if(e.target.textContent === "04 - Wasserversorgung4") {
            navigate(`/wasserversorgung`);
        } else if (e.target.textContent === "05 - Sanitäranlagen5") {
            navigate(`/sanitäranlagen`);
        } else if (e.target.textContent === "06 - Heizung6") {
            navigate(`/heizung`);
        } else if (e.target.textContent === "07 - Lüftung7"){
            navigate(`/lüftung`);
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
              Baugruppen
            </Card.Header>
            <Card.Body className="p-0 ">
            <ListGroup className="rounded-0 " >
              
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                01 - Aufbau
                <Badge bg="primary" pill>1</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                 02 - Innenausbau
                 <Badge bg="primary" pill>2</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  03 - Stromversorgung
                  <Badge bg="primary" pill>3</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  04 - Wasserversorgung
                  <Badge bg="primary" pill>4</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  05 - Sanitäranlagen
                  <Badge bg="primary" pill>5</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  06 - Heizung
                  <Badge bg="primary" pill>6</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  07 - Lüftung
                  <Badge bg="primary" pill>7</Badge>
              </ListGroup.Item>
              
              </ListGroup>
        
            </Card.Body>
            
          </Card>
          
        </Col>
      </Row>
  );
};

export default BaugruppenUebersicht;
