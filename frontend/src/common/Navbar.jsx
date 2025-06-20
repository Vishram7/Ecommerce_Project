import React from 'react'
import { Button, Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {

  const navigate = useNavigate()
  let cartCount = 10

  return (
    <>
      <Navbar expand="lg" style={{ background: "grey", padding: '15px 0px' }}>
        <Container>
          <Link to='/home' style={{ textDecoration: 'none' }}><Navbar.Brand>Logo</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Search</Nav.Link>

              <div>
                <Button style={{ position: 'relative', background: 'none', border: 'none' }} onClick={() => navigate('/cart')}>
                  {/* <FaShoppingCart style={{ marginRight: '10px' }} size={20} /> */}
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '35px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}>
                    {cartCount}
                  </span>
                  Cart
                </Button>
                <Button onClick={() => navigate('/login')}>Logout</Button>
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar