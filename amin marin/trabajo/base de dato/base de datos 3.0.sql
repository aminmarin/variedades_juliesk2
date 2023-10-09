CREATE DATABASE  variedades_juliesk2;

USE variedades_juliesk2;


-- Crear la tabla de Productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY,
    nombre VARCHAR(255),
    categoria VARCHAR(50),
    precio DECIMAL(10, 2),
    stock INT
);

-- Crear la tabla de Clientes
CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    email VARCHAR(100)
);

-- Crear la tabla de Usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    tipo VARCHAR(20) -- Puede ser 'cliente' o 'admin'
);

-- Crear la tabla de Carrito de Compra
CREATE TABLE carrito_compra (
    id_carrito INT PRIMARY KEY,
    id_cliente INT,
    id_usuario INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Crear la tabla de Detalle del Carrito
CREATE TABLE detalle_carrito (
    id_detalle INT PRIMARY KEY,
    id_carrito INT,
    id_producto INT,
    cantidad INT,
    FOREIGN KEY (id_carrito) REFERENCES carrito_compra(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE bitacora (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    actividad VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

- Procedimientos Almacenados para la tabla de Productos
DELIMITER //
CREATE PROCEDURE AgregarProducto(
    IN p_nombre VARCHAR(255),
    IN p_categoria VARCHAR(50),
    IN p_precio DECIMAL(10, 2),
    IN p_stock INT
)
BEGIN
    INSERT INTO productos (nombre, categoria, precio, stock)
    VALUES (p_nombre, p_categoria, p_precio, p_stock);
END //

CREATE PROCEDURE ActualizarProducto(
    IN p_id_producto INT,
    IN p_nombre VARCHAR(255),
    IN p_categoria VARCHAR(50),
    IN p_precio DECIMAL(10, 2),
    IN p_stock INT
)
BEGIN
    UPDATE productos
    SET nombre = p_nombre, categoria = p_categoria, precio = p_precio, stock = p_stock
    WHERE id_producto = p_id_producto;
END //

CREATE PROCEDURE BuscarProductoPorID(IN p_id_producto INT)
BEGIN
    SELECT * FROM productos
    WHERE id_producto = p_id_producto;
END //

CREATE PROCEDURE EliminarProductoPorID(IN p_id_producto INT)
BEGIN
    DELETE FROM productos
    WHERE id_producto = p_id_producto;
END //
DELIMITER ;

-- Procedimientos Almacenados para la tabla de Clientes
DELIMITER //
CREATE PROCEDURE AgregarCliente(
    IN p_nombre VARCHAR(100),
    IN p_direccion VARCHAR(255),
    IN p_email VARCHAR(100)
)
BEGIN
    INSERT INTO clientes (nombre, direccion, email)
    VALUES (p_nombre, p_direccion, p_email);
END //

CREATE PROCEDURE ActualizarCliente(
    IN p_id_cliente INT,
    IN p_nombre VARCHAR(100),
    IN p_direccion VARCHAR(255),
    IN p_email VARCHAR(100)
)
BEGIN
    UPDATE clientes
    SET nombre = p_nombre, direccion = p_direccion, email = p_email
    WHERE id_cliente = p_id_cliente;
END //

CREATE PROCEDURE BuscarClientePorID(IN p_id_cliente INT)
BEGIN
    SELECT * FROM clientes
    WHERE id_cliente = p_id_cliente;
END //

CREATE PROCEDURE EliminarClientePorID(IN p_id_cliente INT)
BEGIN
    DELETE FROM clientes
    WHERE id_cliente = p_id_cliente;
END //
DELIMITER ;

-- Procedimientos Almacenados para la tabla de Carrito_Compra
DELIMITER //
CREATE PROCEDURE AgregarCarritoCompra(
    IN p_id_cliente INT,
    IN p_id_usuario INT
)
BEGIN
    INSERT INTO carrito_compra (id_cliente, id_usuario)
    VALUES (p_id_cliente, p_id_usuario);
END //

CREATE PROCEDURE EliminarCarritoCompraPorID(IN p_id_carrito INT)
BEGIN
    DELETE FROM carrito_compra
    WHERE id_carrito = p_id_carrito;
END //
DELIMITER ;

-- Procedimientos Almacenados para la tabla de Detalle_Carrito
DELIMITER //
CREATE PROCEDURE AgregarDetalleCarrito(
    IN p_id_carrito INT,
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad)
    VALUES (p_id_carrito, p_id_producto, p_cantidad);
END //

CREATE PROCEDURE ActualizarDetalleCarrito(
    IN p_id_detalle INT,
    IN p_cantidad INT
)
BEGIN
    UPDATE detalle_carrito
    SET cantidad = p_cantidad
    WHERE id_detalle = p_id_detalle;
END //

CREATE PROCEDURE EliminarDetalleCarritoPorID(IN p_id_detalle INT)
BEGIN
    DELETE FROM detalle_carrito
    WHERE id_detalle = p_id_detalle;
END //
DELIMITER ;

-- Insertar datos en la tabla "productos" (ropa para bebé)
INSERT INTO productos (id_producto, nombre, categoria, precio, stock)
VALUES
    (1, 'Body de algodón', 'Ropa para bebé', 12.99, 50),
    (2, 'Conjunto de pijama', 'Ropa para bebé', 19.99, 30),
    (3, 'Vestido de princesa', 'Ropa para bebé', 29.95, 20),
    (4, 'Sudadera con capucha', 'Ropa para bebé', 14.99, 40),
    (5, 'Calcetines de colores', 'Ropa para bebé', 5.99, 100);

-- Insertar datos en la tabla "clientes" (compradores de ropa para bebé)
INSERT INTO clientes (id_cliente, nombre, direccion, email)
VALUES
    (1, 'Ana García', 'Calle 123, juigalpa', 'ana@gmail.com'),
    (2, 'Luis Pérez', 'Avenida chaco D leo 456, BO torrez', 'luiscomportate@gmail.com'),
    (3, 'María López', 'Carretera 789, Villa Sandino', 'marialamaslinda@gmail.com'),
    (4, 'Pedro Rodríguez', 'carretera Km 45, Poblado la palma', 'pedroinfante@gmail.com'),
    (5, 'Laura Sánchez', 'Calle 567, Localidad', 'lauralogoza@gmail.com');




-- Trigger para la tabla "productos"
DELIMITER //
CREATE TRIGGER RegistrarInsercionProducto
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se agregó un nuevo producto con ID ', NEW.id_producto));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarActualizacionProducto
AFTER UPDATE ON productos
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se actualizó el producto con ID ', OLD.id_producto));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarEliminacionProducto
AFTER DELETE ON productos
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se eliminó el producto con ID ', OLD.id_producto));
END;
//
DELIMITER ;

-- Trigger para la tabla "clientes"
DELIMITER //
CREATE TRIGGER RegistrarInsercionCliente
AFTER INSERT ON clientes
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se agregó un nuevo cliente con ID ', NEW.id_cliente));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarActualizacionCliente
AFTER UPDATE ON clientes
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se actualizó el cliente con ID ', OLD.id_cliente));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarEliminacionCliente
AFTER DELETE ON clientes
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se eliminó el cliente con ID ', OLD.id_cliente));
END;
//
DELIMITER ;


-- Trigger para la tabla "carrito_compra"
DELIMITER //
CREATE TRIGGER RegistrarInsercionCarritoCompra
AFTER INSERT ON carrito_compra
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se creó un nuevo carrito de compra con ID ', NEW.id_carrito));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarEliminacionCarritoCompra
AFTER DELETE ON carrito_compra
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se eliminó el carrito de compra con ID ', OLD.id_carrito));
END;
//
DELIMITER ;

-- Trigger para la tabla "detalle_carrito"
DELIMITER //
CREATE TRIGGER RegistrarInsercionDetalleCarrito
AFTER INSERT ON detalle_carrito
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se agregó un nuevo detalle al carrito de compra con ID ', NEW.id_carrito));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarActualizacionDetalleCarrito
AFTER UPDATE ON detalle_carrito
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se actualizó un detalle del carrito de compra con ID ', OLD.id_carrito));
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER RegistrarEliminacionDetalleCarrito
AFTER DELETE ON detalle_carrito
FOR EACH ROW
BEGIN
    INSERT INTO bitacora (actividad) VALUES (CONCAT('Se eliminó un detalle del carrito de compra con ID ', OLD.id_carrito));
END;
//
DELIMITER ;




