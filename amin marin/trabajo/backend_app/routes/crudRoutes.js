const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Ruta para leer registros de la tabla productos
    router.get('/readProductos', (reg, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros


        const sql = 'SELECT * FROM productos';


        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer registro de producto:', err);
                res.status(500).json({ error: 'Error al leer registros de la tabla producto' });
            } else {
                // Devolver los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });

    //Sentencias para los CRUD de la tabla Productos
    //curl http://localhost:5000/crud/readProductos
    // curl -X POST -H "Content-Type: application/json" -d "{\"idproducto\":1,\"nombre\":\"Mameluco\",\"categoria\":\"niño\",\"precio\":50.5,\"stock\":300}" http://localhost:5000/crud/createProducto
    //curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"biberón\",\"categoria\":\"niña\",\"precio\":50.3,\"stock\":50}" http://localhost:5000/crud/updateProducto/1
   //curl -X DELETE http://localhost:5000/crud/deleteProducto/1

    // Ruta para crear un nuevo producto
    router.post('/createProducto', (req, res) => {
        const { idproducto, nombre, categoria, precio, stock } = req.body;

        if (!idproducto || !nombre || !categoria || !precio || !stock) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const sql = 'INSERT INTO productos (id_producto, nombre, categoria, precio, stock) VALUES (?, ?, ?, ?, ?)';
        const values = [idproducto, nombre, categoria, precio, stock];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al insertar el producto:', err);
                res.status(500).json({ error: 'Error al insertar el producto' });
            } else {
                res.status(201).json({message: 'Producto creado con éxito' });
            }
        });
    });

    // Ruta para actualizar un producto por ID
    router.put('/updateProducto/:idproducto', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const idproducto = req.params.idproducto;
    
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { nombre, categoria, precio, stock } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!nombre || !categoria || !precio || !stock) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
          UPDATE productos
          SET nombre = ?, categoria = ?, precio = ?, stock = ?
          WHERE id_producto = ?
        `;
    
        const values = [nombre, categoria, precio, stock, idproducto];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Producto actualizado con éxito' });
          }
        });
      });

    // Ruta para eliminar un producto por ID
    router.delete('/deleteProducto/:idproducto', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const idproducto = req.params.idproducto;
    
        // Realiza la consulta SQL para eliminar el registro por ID
        const sql = 'DELETE FROM productos WHERE id_producto = ?';
    
        // Ejecuta la consulta
        db.query(sql, [idproducto], (err, result) => {
          if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Producto eliminado con éxito' });
          }
        });
      });

    //Rutas de la tabla Clientes
    //Ruta para leer los registros de la tabla Clientes
    router.get('/readClientes', (req, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros
        const sql = 'SELECT * FROM clientes';
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
          if (err) {
            console.error('Error al leer los clientes:', err);
            res.status(500).json({ error: 'Error al leer los clientes' });
          } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
          }
        });
      });

      //Sentencias del crud para la tabla clientes
      //curl http://localhost:5000/crud/readClientes
      //curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"Amin\",\"direccion\":\"Casa de habitación\",\"email\":\"aminmarin12@gmail.com\"}" http://localhost:5000/crud/createCliente
      //curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"Josh\",\"direccion\":\"Casa de su casa\",\"email\":\"josh234@gmail.com\"}" http://localhost:5000/crud/updateCliente/1
      //curl -X DELETE http://localhost:5000/crud/deleteCliente/1

      //ruta para insertar un nuevo registro en la tabla clientes
      router.post('/createCliente', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { nombre, direccion, email } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!nombre || !direccion || !email) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo registro con ID específico
        const sql = `INSERT INTO clientes (nombre, direccion, email) VALUES (?, ?, ?)`;
        const values = [nombre, direccion, email];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al insertar un nuevo cliente:', err);
            res.status(500).json({ error: 'Error al insertar un nuevo cliente' });
          } else {
            // Devuelve el mensaje como respuesta
            res.status(200).json({ message: 'Cliente registrado con éxito' });
          }
        });
      });

      //ruta para actualizar un registro de la tabla clientes
      router.put('/updateCliente/:idCliente', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const idCliente = req.params.idCliente;
    
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { nombre, direccion, email } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!nombre || !direccion || !email) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
          UPDATE clientes
          SET nombre = ?, direccion = ?, email = ?
          WHERE id_cliente = ?
        `;
    
        const values = [nombre, direccion, email, idCliente];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar cliente:', err);
            res.status(500).json({ error: 'Error al actualizar cliente' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Cliente actualizado con éxito' });
          }
        });
      });

      //ruta para eliminar un registro de la tabla clientes
      router.delete('/deleteCliente/:idCliente', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const idCliente = req.params.idCliente;
    
        // Realiza la consulta SQL para eliminar el registro por ID
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
    
        // Ejecuta la consulta
        db.query(sql, [idCliente], (err, result) => {
          if (err) {
            console.error('Error al eliminar cliente:', err);
            res.status(500).json({ error: 'Error al eliminar cliente' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Cliente eliminado con éxito' });
          }
        });
      });

      //ruta para leer los registros de la tabla usuarios
      router.get('/readUsuarios', (req, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros
        const sql = 'SELECT * FROM usuarios';
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
          if (err) {
            console.error('Error al leer los usuarios:', err);
            res.status(500).json({ error: 'Error al leer los usuarios' });
          } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
          }
        });
      });

      //Sentencias para crud de la tabla usuarios
      //curl http://localhost:5000/crud/readUsuarios
      //curl -X POST -H "Content-Type: application/json" -d "{\"idUsuario\":1,\"username\":\"amin12\",\"password\":\"123\",\"tipo\":\"Administrador\"}" http://localhost:5000/crud/createUsuario
      //curl -X PUT -H "Content-Type: application/json" -d "{\"username\":\"josh\",\"password\":\"word123\",\"tipo\":\"Usuario\"}" http://localhost:5000/crud/updateUsuario/1
      //curl -X DELETE http://localhost:5000/crud/deleteUsuario/1

      //ruta para insertar un nuevo usuario
      router.post('/createUsuario', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { idUsuario, username, password, tipo } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!idUsuario || !username || !password || !tipo) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo registro con ID específico
        const sql = `INSERT INTO usuarios (id_usuario, username, password, tipo) VALUES (?, ?, ?, ?)`;
        const values = [idUsuario, username, password, tipo];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al insertar el usuario:', err);
            res.status(500).json({ error: 'Error al insertar el usuario' });
          } else {
            // Devuelve el mensaje como respuesta
            res.status(201).json({ message: 'Usuario creado con éxito' });
          }
        });
      });

      //ruta para actualizar un registro de la tabla usuarios
      router.put('/updateUsuario/:idUsuario', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const idUsuario = req.params.idUsuario;
    
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { username, password, tipo } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!username || !password || !tipo) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
          UPDATE usuarios
          SET username = ?, password = ?, tipo = ?
          WHERE id_usuario = ?
        `;
    
        const values = [username, password, tipo, idUsuario];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Usuario actualizado con éxito' });
          }
        });
      });

      //ruta para eliminar un registro de la tabla usuarios
      router.delete('/deleteUsuario/:idUsuario', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const idUsuario = req.params.idUsuario;
    
        // Realiza la consulta SQL para eliminar el registro por ID
        const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    
        // Ejecuta la consulta
        db.query(sql, [idUsuario], (err, result) => {
          if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
          } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Usuario eliminado con éxito' });
          }
        });
      });

      //ruta para leer los registros de la tabla carrito_compra
      router.get('/readCarritoCompra', (req, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros
        const sql = 'SELECT * FROM carrito_compra';
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
          if (err) {
            console.error('Error al leer registros de carrito_compra:', err);
            res.status(500).json({ error: 'Error al leer registros de carrito_compra' });
          } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
          }
        });
      });

      //Sentencias del crud de la tabla carrito_compra
      // curl http://localhost:5000/crud/readCarritoCompra
      //curl -X POST -H "Content-Type: application/json" -d "{\"idCarrito\":1,\"idCliente\":1,\"idUsuario\":1,\"fecha\":\"2023-09-12 01:20:32\"}" http://localhost:5000/crud/createCarritoCompra
      //curl -X PUT -H "Content-Type: application/json" -d "{\"idCliente\":1,\"idUsuario\":1,\"fecha\":\"2023-10-11 12:30:00\"}" http://localhost:5000/crud/updateCarritoCompra/1
      //curl -X DELETE http://localhost:5000/crud/deleteCarritoCompra/1

      //ruta para insertar un nuevo registro en la tabla carrito_compra
      router.post('/createCarritoCompra', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { idCarrito, idCliente, idUsuario, fecha } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!idCarrito || !idCliente || !idUsuario || !fecha) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo registro con ID específico
        const sql = `INSERT INTO carrito_compra (id_carrito, id_cliente, id_usuario, fecha) VALUES (?, ?, ?, ?)`;
        const values = [idCarrito, idCliente, idUsuario, fecha];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al insertar la compra del carrito:', err);
            res.status(500).json({ error: 'Error al insertar la compra del carrito' });
          } else {
            // Devuelve mensaje como respuesta
            res.status(201).json({ message: 'Compra del carrito registrada con éxito' });
          }
        });
      });

        //ruta para actualizar el registro de la tabla carrito_compra
        router.put('/updateCarritoCompra/:idCarrito', (req, res) => {
          // Obtén el ID del registro a actualizar desde los parámetros de la URL
          const idCarrito = req.params.idCarrito;
      
          // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
          const { idCliente, idUsuario, fecha } = req.body;
      
          // Verifica si se proporcionaron los datos necesarios
          if (!idCliente || !idUsuario || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
          }
      
          // Realiza la consulta SQL para actualizar el registro por ID
          const sql = `
            UPDATE carrito_compra
            SET id_cliente = ?, id_usuario = ?, fecha = ?
            WHERE id_carrito = ?
          `;
      
          const values = [idCliente, idUsuario, fecha, idCarrito];
      
          // Ejecuta la consulta
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error('Error al actualizar la compra del carrito:', err);
              res.status(500).json({ error: 'Error al actualizar la compra del carrito' });
            } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Compra actualizada con éxito' });
            }
          });
        });

        //ruta para eliminar el registro de la tabla carrito_compra
        router.delete('/deleteCarritoCompra/:idCarrito', (req, res) => {
          // Obtén el ID del registro a eliminar desde los parámetros de la URL
          const idCarrito = req.params.idCarrito;
      
          // Realiza la consulta SQL para eliminar el registro por ID
          const sql = 'DELETE FROM carrito_compra WHERE id_carrito = ?';
      
          // Ejecuta la consulta
          db.query(sql, [idCarrito], (err, result) => {
            if (err) {
              console.error('Error al eliminar la compra del carrito:', err);
              res.status(500).json({ error: 'Error al eliminar la compra del carrito' });
            } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Compra eliminada con éxito' });
            }
          });
        });

        //ruta para leer la tabla detalle_carrito
        router.get('/readDetalleCarrito', (req, res) => {
          // Utiliza la instancia de la base de datos pasada como parámetro
          // Realizar una consulta SQL para seleccionar todos los registros
          const sql = 'SELECT * FROM detalle_carrito';
      
          // Ejecutar la consulta
          db.query(sql, (err, result) => {
            if (err) {
              console.error('Error al leer registros del carrito:', err);
              res.status(500).json({ error: 'Error al leer registros del carrito' });
            } else {
              // Devolver los registros en formato JSON como respuesta
              res.status(200).json(result);
            }
          });
        });

        //Sentencias del crud de la tabla detalle_carrito
        //curl http://localhost:5000/crud/readDetalleCarrito
        //curl -X POST -H "Content-Type: application/json" -d "{\"idDetalle\":1,\"idCarrito\":1,\"idproducto\":1,\"cantidad\":3}" http://localhost:5000/crud/createDetalleCarrito
        //curl -X PUT -H "Content-Type: application/json" -d "{\"idCarrito\":1,\"idproducto\":1,\"cantidad\":10}" http://localhost:5000/crud/updateDetalleCarrito/1
        //curl -X DELETE http://localhost:5000/crud/deleteDetalleCarrito/1

        //ruta para insertar un nuevo registro en la tabla detalle_carrito
        router.post('/createDetalleCarrito', (req, res) => {
          // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
          const { idDetalle, idCarrito, idproducto, cantidad } = req.body;
      
          // Verifica si se proporcionaron los datos necesarios
          if (!idDetalle || !idCarrito || !idproducto || !cantidad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
          }
      
          // Realiza la consulta SQL para insertar un nuevo registro con ID específico
          const sql = `INSERT INTO detalle_carrito (id_detalle, id_carrito, id_producto, cantidad) VALUES (?, ?, ?, ?)`;
          const values = [idDetalle, idCarrito, idproducto, cantidad];
      
          // Ejecuta la consulta
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error('Error al insertar la compra:', err);
              res.status(500).json({ error: 'Error al insertar la compra' });
            } else {
              // Devuelve mensaje como respuesta
              res.status(201).json({ message: 'Compra registrada con éxito' });
            }
          });
        });

        //ruta para actualizar un registro de la tabla detalle_carrito
        router.put('/updateDetalleCarrito/:idDetalle', (req, res) => {
          // Obtén el ID del registro a actualizar desde los parámetros de la URL
          const idDetalle = req.params.idDetalle;
      
          // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
          const { idCarrito, idproducto, cantidad } = req.body;
      
          // Verifica si se proporcionaron los datos necesarios
          if (!idCarrito || !idproducto || !cantidad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
          }
      
          // Realiza la consulta SQL para actualizar el registro por ID
          const sql = `
            UPDATE detalle_carrito
            SET id_carrito = ?, id_producto = ?, cantidad = ?
            WHERE id_detalle = ?
          `;
      
          const values = [idCarrito, idproducto, cantidad, idDetalle];
      
          // Ejecuta la consulta
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error('Error al actualizar la compra:', err);
              res.status(500).json({ error: 'Error al actualizar la compra' });
            } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Detalle de compra actualizada con éxito' });
            }
          });
        });

        //ruta para eliminar un registro de la tabla detalle_carrito
        router.delete('/deleteDetalleCarrito/:idDetalle', (req, res) => {
          // Obtén el ID del registro a eliminar desde los parámetros de la URL
          const idDetalle= req.params.idDetalle;
      
          // Realiza la consulta SQL para eliminar el registro por ID
          const sql = 'DELETE FROM detalle_carrito WHERE id_detalle = ?';
      
          // Ejecuta la consulta
          db.query(sql, [idDetalle], (err, result) => {
            if (err) {
              console.error('Error al eliminar el detalle de compra:', err);
              res.status(500).json({ error: 'Error al eliminar el detalle de compra' });
            } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Detalle de compra eliminado con éxito' });
            }
          });
        });

      return router;
};


