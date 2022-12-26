import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { deleteUser } from "../apis/AuthFinder";

const UserLöschen = () => {
  const [userToBeDeleted, setUserToBeDeleted] = useState({
    benutzername: "",
    success: false,
    msg: "",
  });
  const [errMsg, setErrMsg] = useState("");

  async function handleUserDelete(e) {
    e.preventDefault();
    setErrMsg("");
    try {
      const response = await deleteUser(userToBeDeleted.benutzername);
      setUserToBeDeleted({
        ...userToBeDeleted,
        success: true,
        msg: response.data.message,
      });
    } catch (err) {
      setUserToBeDeleted({
        ...userToBeDeleted,
        success: false,
        msg: "",
      });
      setErrMsg({
        msg: "Benutzer hat bereits Aufgaben erledigt und deswegen kann nicht gelöscht werden. Bitte sperren",
      });
    }
  }
  return (
    <Container>
      <h1 className="userAdministrationText">User Löschen</h1>
      <form>
        <Alert
          className="p-0"
          key="sucesss"
          variant="success"
          show={userToBeDeleted.success ? true : false}
        >
          <Row className="mx-3 my-1">
            <Col
              md="auto"
              className="d-flex justify-content-center align-items-center p-1"
            >
              <Alert.Heading className="m-0">Erfolg</Alert.Heading>
            </Col>
            <Col className="d-flex align-items-center justify-content-center p-1">
              <p className="m-0" aria-live="assertive">
                {userToBeDeleted.msg}
              </p>
            </Col>
          </Row>
        </Alert>
        <Alert
          className="p-0"
          key="danger"
          variant="danger"
          show={errMsg ? true : false}
        >
          <Row className="mx-3 my-1">
            <Col
              md="auto"
              className="d-flex justify-content-center align-items-center p-1"
            >
              <Alert.Heading className="m-0">Fehler</Alert.Heading>
            </Col>
            <Col className="d-flex align-items-center justify-content-center p-1">
              <p className="m-0" aria-live="assertive">
                {errMsg.msg}
              </p>
            </Col>
          </Row>
        </Alert>
        <Row className="adminUserRow">
          <Row>
            <label className="adminInputLabel" htmlFor="inputBenutzerName">
              Benutzername
            </label>
          </Row>
          <Row>
            <input
              className="adminInputField"
              type="text"
              placeholder=""
              onChange={(e) => {
                setUserToBeDeleted({
                  ...userToBeDeleted,
                  benutzername: e.target.value,
                });
              }}
            />
          </Row>
        </Row>
        <Row className="adminUserRow">
          <button className="adminUserButton" onClick={handleUserDelete}>
            User Löschen
          </button>
        </Row>
      </form>
    </Container>
  );
};

export default UserLöschen;
