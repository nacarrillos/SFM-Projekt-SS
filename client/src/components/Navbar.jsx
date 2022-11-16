import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../apis/AuthFinder";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import { BauteilContext } from "../context/BauteilContext";
import "./Navbar.css";
import "../App.css";


//Header Komponent für jeder Seite
const Header = () => {
  //isAuth als State importiert sodass wir wissen können, ob der Benutzer authentiziert ist oder nicht
  const { isAuth } = useSelector((state) => state.auth);

  //ForTest
  const { userData } = useContext(BauteilContext);

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

      {/* Default-Breakpoint Medium 'md' bei Seiten die kleiner als 768 px dargestellt werden
      */}
      <Navbar
        collapseOnSelect
        expand="md"
        className="navMod"
        variant = "dark"
        
        
      >
        
        <Container fluid className="navContainer">
              <Navbar.Brand href="/" className="navBrand">
                <img 
                  src="/images/logoNeuWhite.png"
                  alt="Wooden Valley Logo"
                  height="55"
                  className="navImg"
                />
              </Navbar.Brand>
              <Navbar.Text>
                {/* <pre>
                  {JSON.stringify(
                    isAuth +
                      " " +
                      userData.benutzername +
                      " " +
                      userData.benutzertyp
                  )}
                </pre> */}
              </Navbar.Text>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navToogle"/>
                
                <Navbar.Collapse id="responsive-navbar-nav">
                <div className="navCollContainer">
                <Nav className="navElements" >
                    <Nav.Link href="/" className="navLinkBody">
                      HOME
                    </Nav.Link>
                    {isAuth ? (
                      <Nav.Link
                        href="/"
                        onClick={() => logout()}
                        className="navLinkBody"
                      >
                        ABMELDUNG
                      </Nav.Link>
                    ) : (
                      <Nav.Link href="/login" className="navLinkBody">
                        ANMELDUNG
                      </Nav.Link>

                      
                    )}
                    <Nav.Link href="/" className="navLinkBody">
                      PLACEHOLDER1
                    </Nav.Link>
                    <Nav.Link href="/" className="navLinkBody">
                      PLACEHOLDER2
                    </Nav.Link>
                  </Nav>

                  </div>
                </Navbar.Collapse>
                


             
              
        </Container>
      </Navbar>
    

    </>
      
  );
};

export default Header;



