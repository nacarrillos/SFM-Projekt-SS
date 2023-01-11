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
        
        if(e.target.textContent === "01 - AufbauOk") {
          navigate(`/aufbau`);
        } else if (e.target.textContent ==="02 - InnenausbauWartung") {
            navigate(`/innenausbau`);
        } else if (e.target.textContent === "03 - StromversorgungWartung") {
            navigate(`/stromversorgung`);
        } else if(e.target.textContent === "04 - WasserversorgungWartung") {
            navigate(`/wasserversorgung`);
        } else if (e.target.textContent === "05 - SanitäranlagenWartung") {
            navigate(`/sanitäranlagen`);
        } else if (e.target.textContent === "06 - HeizungWartung") {
            navigate(`/heizung`);
        } else if (e.target.textContent === "07 - LüftungFehler"){
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
                <Badge bg="success" pill>Ok</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                 02 - Innenausbau
                 <Badge bg="warning" pill>Wartung</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  03 - Stromversorgung
                  <Badge bg="warning" pill>Wartung</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  04 - Wasserversorgung
                  <Badge bg="warning" pill>Wartung</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  05 - Sanitäranlagen
                  <Badge bg="warning" pill>Wartung</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  06 - Heizung
                  <Badge bg="warning" pill>Wartung</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start" action onClick={(e) => handleSuche(e)}>
                  07 - Lüftung
                  <Badge bg="danger" pill>Fehler</Badge>
              </ListGroup.Item>
              
              </ListGroup>
        
            </Card.Body>
            
          </Card>
          
        </Col>
      </Row>
  );
};

export default BaugruppenUebersicht;
