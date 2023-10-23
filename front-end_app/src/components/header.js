import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Variedades Julieska</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>
 
              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ClienteList" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="Productos">
                <NavDropdown.Item>
                  <Link to="/Productos" className="link-unstyled">Registrar Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ClienteList" className="link-unstyled">visualizar productos </Link>
                </NavDropdown.Item>
              </NavDropdown>

              
              <NavDropdown title="Categorias" id="Categorias">
                <NavDropdown.Item>
                  <Link to="/Categorias" className="link-unstyled">Registrar Categorias</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-Categorias" className="link-unstyled">visualizar Categorias </Link>
                </NavDropdown.Item>
              </NavDropdown>



            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

           
            <NavDropdown title="Clientes" id="clientes">
              <NavDropdown.Item>
                <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-cliente" className="link-unstyled">Listar Clientes</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Productos" id="Productos">
              <NavDropdown.Item>
                <Link to="/Productos" className="link-unstyled">Registrar Productos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ClienteList" className="link-unstyled">visualizar productos</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categorias" id="Categorias">
              <NavDropdown.Item>
                <Link to="/Categorias" className="link-unstyled">Registrar Categorias</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-Categoria" className="link-unstyled">visualizar categorias</Link>
              </NavDropdown.Item>
            </NavDropdown>


            
            

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;