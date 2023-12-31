import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/header';

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    email: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Función para abrir el modal y pasar los datos del cliente seleccionado
  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    setFormData({
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      email: cliente.email,
    });
    setShowModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadClientes = () => {
    const url = searchTerm
      ? `http://localhost:5000/crud/readClientes?term=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:5000/crud/readClientes';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateCliente/${selectedCliente.id_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de clientes
          setShowModal(false);
          loadClientes(); // Cargar la lista de clientes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un cliente
  const handleDelete = (id_cliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el cliente
      fetch(`http://localhost:5000/crud/deleteCliente/${id_cliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de clientes
            loadClientes();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los clientes
  useEffect(() => {
    loadClientes();
  }, [searchTerm]);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6">Listado de Clientes</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.email}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id_cliente)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Cliente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="email" label="Email">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClienteList;
