import {
  editUserData,
  getUserData,
  resetPasswordAdmin,
} from "../apis/AuthFinder";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const UserBearbeitung = () => {
  const [userToBeEdited, setUserToBeEdited] = useState({
    benutzername: "",
    kennwort: "",
    benutzertyp: "",
    name: "",
    nachname: "",
    kontakt: "",
    adresse: "",
    msg: "",
    success: false,
  });

  const [errMsg, setErrMsg] = useState("");
  const [userFound, setUserFound] = useState(false);

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
      setUserFound(true);
    } catch (err) {
      setErrMsg("Benutzer wurde nicht gefunden");
      setUserToBeEdited({
        benutzername: "",
        benutzertyp: "",
        name: "",
        nachname: "",
        kontakt: "",
        adresse: "",
        success: false,
      });
      setUserFound(false);
    }
  }

  async function handlePasswortReset(e) {
    e.preventDefault();
    try {
      const response = await resetPasswordAdmin({
        benutzername: userToBeEdited.benutzername,
        kennwort: userToBeEdited.kennwort,
      });
      setUserToBeEdited({
        ...userToBeEdited,
        msg: response.data.message,
        success: true,
      });
      setErrMsg("");
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setUserToBeEdited({
        ...userToBeEdited,
        success: false,
        msg: err.response.data.errors[0].msg,
      });
      setErrMsg(err.response.data.errors[0].msg);
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
      setUserFound(false);
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
        <Row className="adminUserRow">
          <Col md={8}>
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
          {userFound ? (
            <div className="passwordRectangle">
              <input
                type="password"
                placeholder="Neues Passwort"
                className="adminInputField"
                onChange={(e) => {
                  setUserToBeEdited({
                    ...userToBeEdited,
                    kennwort: e.target.value,
                  });
                }}
              />
              <button
                className="passwordResetButton"
                onClick={handlePasswortReset}
              >
                Passwort ändern
              </button>
            </div>
          ) : (
            <></>
          )}
          <Row>
            <Col>
              <label className="adminInputLabel" htmlFor="benutzertyp">
                Benutzertyp
              </label>
              <select
                className="adminInputField"
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
              <label className="adminInputLabel" htmlFor="inputName">
                Name
              </label>
              <input
                className="adminInputField"
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
              <label className="adminInputLabel" htmlFor="inputNachname">
                Nachname
              </label>
              <input
                className="adminInputField"
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
              <label className="adminInputLabel" htmlFor="inputKontakt">
                Kontakt
              </label>
              <input
                className="adminInputField"
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
            <label className="adminInputLabel" htmlFor="inputAdresse">
              Adresse
            </label>
          </Row>
          <Row>
            <input
              className="adminInputField"
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
        <Row className="adminUserRow">
          <button className="adminUserButton" onClick={handleUserEditing}>
            Änderungen speichern
          </button>
        </Row>
      </form>
    </Container>
  );
};

export default UserBearbeitung;
