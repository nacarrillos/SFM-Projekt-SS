import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../apis/AuthFinder";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Header = () => {
  //isAuth als State importiert sodass wir wissen können, ob der Benutzer authentiziert ist oder nicht
  const { isAuth } = useSelector((state) => state.auth);

  //Import of Dispatch für die Anwendung in Logout Funktion
  const dispatch = useDispatch();

  //Logout Funktion für das Event Clicken auf Abmeldung
  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <>
      <Navbar
        sticky="top"
        key="false"
        bg="light"
        expand="false"
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/images/logo.png"
              alt="Wooden Valley Logo"
              height="55"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                Optionen
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" className="text-secondary">
                  Home
                </Nav.Link>
                {isAuth ? (
                  <Nav.Link
                    href="/"
                    onClick={() => logout()}
                    className="text-secondary"
                  >
                    Abmeldung
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login" className="text-secondary">
                    Anmeldung
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
