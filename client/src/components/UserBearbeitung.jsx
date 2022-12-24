import { editUserData, getUserData } from "../apis/AuthFinder";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const UserBearbeitung = () => {
  const [userToBeEdited, setUserToBeEdited] = useState({
    benutzername: "",
    kennwortReset: false,
    benutzertyp: "",
    name: "",
    nachname: "",
    kontakt: "",
    adresse: "",
    msg: "",
    success: false,
  });

  const [errMsg, setErrMsg] = useState("");

  async function handleUserSearch(e) {
    e.preventDefault();
    setErrMsg("");
    try {
      const response = await getUserData(userToBeEdited.benutzername);
      setUserToBeEdited({
        ...userToBeEdited,
        benutzertyp: response.data.benutzertyp,
        name: response.data.name,
        nachname: response.data.nachname,
        kontakt: response.data.kontakt,
        adresse: response.data.adresse,
        message: "",
        success: false,
      });
    } catch (err) {
      setErrMsg("Benutzer wurde nicht gefunden");
      setUserToBeEdited({
        benutzername: "",
        kennwortReset: false,
        benutzertyp: "",
        name: "",
        nachname: "",
        kontakt: "",
        adresse: "",
        msg: errMsg,
        success: false,
      });
    }
  }

  async function handleUserEditing(e) {
    e.preventDefault();
    try {
      const response = await editUserData({
        benutzername: userToBeEdited.benutzername,
        benutzertyp: userToBeEdited.benutzertyp,
        name: userToBeEdited.name,
        nachname: userToBeEdited.nachname,
        kontakt: userToBeEdited.kontakt,
        adresse: userToBeEdited.adresse,
      });
      setUserToBeEdited({
        ...userToBeEdited,
        msg: response.data.message,
        success: true,
      });
      setErrMsg("");
      console.log(userToBeEdited);
    } catch (err) {
      setUserToBeEdited({
        ...userToBeEdited,
        success: false,
        msg: err.message,
      });
      setErrMsg(err.message);
    }
  }

  return (
    <Container>
      <h1 className="userAdministrationText">User Bearbeiten</h1>
      <form>
        <Alert
          className="p-0"
          key="sucesss"
          variant="success"
          show={userToBeEdited.success ? true : false}
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
                {userToBeEdited.msg}
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
                {errMsg}
              </p>
            </Col>
          </Row>
        </Alert>
        <Row className="userRegistrierungRow">
          <Col md={8}>
            <Row>
              <label className="registrationLabel" htmlFor="inputBenutzerName">
                Benutzername
              </label>
            </Row>
            <Row>
              <input
                className="registrationField"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    benutzername: e.target.value,
                  });
                }}
              />
            </Row>
          </Col>
          <Col md={4}>
            <button className="searchbutton" onClick={handleUserSearch}>
              Suchen
            </button>
          </Col>
          <Row>
            <Col>
              <label className="registrationLabel" htmlFor="benutzertyp">
                Benutzertyp
              </label>
              <select
                className="registrationField"
                id="benutzertyp"
                name="benutzertyp"
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    benutzertyp: e.target.value,
                  });
                }}
                value={userToBeEdited.benutzertyp}
              >
                <option value="Admin">Admin</option>
                <option value="Produktionsmitarbeiter">
                  Produktionsmitarbeiter
                </option>
                <option value="Monteur">Monteur</option>
                <option value="Handwerker">Handwerker</option>
                <option value="Besitzer">Besitzer</option>
              </select>
            </Col>
            <Col>
              <label className="registrationLabel" htmlFor="inputName">
                Name
              </label>
              <input
                className="registrationField"
                type="text"
                defaultValue={userToBeEdited.name}
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    name: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="registrationLabel" htmlFor="inputNachname">
                Nachname
              </label>
              <input
                className="registrationField"
                type="text"
                defaultValue={userToBeEdited.nachname}
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    nachname: e.target.value,
                  });
                }}
              />
            </Col>
            <Col>
              <label className="registrationLabel" htmlFor="inputKontakt">
                Kontakt
              </label>
              <input
                className="registrationField"
                type="text"
                defaultValue={userToBeEdited.kontakt}
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    kontakt: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <label className="registrationLabel" htmlFor="inputAdresse">
              Adresse
            </label>
          </Row>
          <Row>
            <input
              className="registrationField"
              type="text"
              defaultValue={userToBeEdited.adresse}
              onChange={(e) => {
                setUserToBeEdited({
                  ...userToBeEdited,
                  adresse: e.target.value,
                });
              }}
            />
          </Row>
        </Row>
        <Row className="userRegistrierungRow">
          <button className="registerButton" onClick={handleUserEditing}>
            User Bearbeiten
          </button>
        </Row>
      </form>
    </Container>
  );
};

export default UserBearbeitung;
