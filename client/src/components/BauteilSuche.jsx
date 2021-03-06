import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const BauteilSuche = () => {
  const [bauteilId, setBauteilId] = useState("");
  let navigate = useNavigate();

  const handleSuche = (e, id) => {
    e.preventDefault();
    try {
      if (bauteilId !== "") {
        navigate(`/bauteil/${id}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center" md={2}>
        <Form>
          <Form.Group className="my-4" controlId="ControlId">
            <Row className="d-flex justify-content-center align-items-center">
              <Col>
                <Form.Control
                  size="lg"
                  value={bauteilId}
                  onChange={(e) => setBauteilId(e.target.value)}
                  type="number"
                  placeholder="Screib die Bauteile ID Wenn du es kennst"
                  required
                />
              </Col>
              <Col sm={1}>
                <Button
                  onClick={(e) => handleSuche(e, bauteilId)}
                  type="submit"
                  className="btn btn-primary"
                  size="lg"
                >
                  Suchen
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
    </Container>
    // <div className="mt-4 mb-4">
    //   <form action="">
    //     <div className="row">
    //       <div className="col-11">
    //         <input
    //           value={bauteilId}
    //           onChange={(e) => setBauteilId(e.target.value)}
    //           className="form-control"
    //           type="number"
    //           placeholder="Screib die Bauteile ID Wenn du es kennst"
    //           required
    //         />
    //       </div>
    //       <div className="col">
    //         <button
    //           onClick={(e) => handleSuche(e, bauteilId)}
    //           type="submit"
    //           className="btn btn-primary"
    //         >
    //           Suchen
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
};

export default BauteilSuche;
