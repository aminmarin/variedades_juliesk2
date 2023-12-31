import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/header';
import '../styles/App.css';

function Cliente() {

    // Crear un estado para cada campo del formulario
    const [nombre, setnombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [email, setemail] = useState('');
    

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            nombre,
            direccion,
            email
            
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createCliente', {
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
                setnombre('');
                setdireccion('');
                setemail('');
                
                
            } else {
                alert('Error al registrar el cliente');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    return (
        <div>
            <Header />

            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Cliente</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre" label="Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            value={nombre}
                                            onChange={(e) => setnombre(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="direccion" label="Dirección">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su dirección"
                                            value={direccion}
                                            onChange={(e) => setdireccion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>



                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="email" label="Ingrese su email">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su email "
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>





                            </Row>
                            <div className="center-button">
                                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
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

export default Cliente;