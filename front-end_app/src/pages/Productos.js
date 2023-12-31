import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/header';
import '../styles/App.css';

function Producto() {

  // Crear un estado para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setstock] = useState('');
  const [categoria, setCategoria] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/readproductos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setstock('');
        setCategoria('');
      } else {
        alert('Error al registrar producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3" >
          <Card.Body>
            <Card.Title>Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio" 
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="stock" label="Cantidad">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese la cantidad" 
                      value={stock}
                      onChange={(e) => setstock(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="categoria" label="Categoria">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la categoria" 
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Producto;