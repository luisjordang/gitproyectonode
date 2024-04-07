const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Array para almacenar los productos
let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const { id, nombre, precio } = req.body;
    const nuevoProducto = { id, nombre, precio };
    productos.push(nuevoProducto);
    res.json({ message: 'Producto agregado', producto: nuevoProducto });
});

// Ruta para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    if (productoEncontrado) {
        productoEncontrado.nombre = nombre;
        productoEncontrado.precio = precio;
        res.json({ message: 'Producto actualizado', producto: productoEncontrado });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    if (index !== -1) {
        productos.splice(index, 1);
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
