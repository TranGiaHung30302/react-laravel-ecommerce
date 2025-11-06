import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container,
} from "react-bootstrap";

import logoImg from "../assets/images/logo.png";
const Home = () => {
  return (
    <div>
      <header className="shadow">
        <div className="bg-dark text-center py-3">
          <span className="text-white">Your fashion partner</span>
        </div>

        <div className="container w-75 mx-auto">
          <Navbar expand="lg" className="">
            <Navbar.Brand href="#">
              <img src={logoImg} alt="" width={120} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1">Men</Nav.Link>
                <Nav.Link href="#action2">Women</Nav.Link>
                <Nav.Link href="#action2">Kids</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </div>
  );
};

export default Home;
