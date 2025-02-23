const express = require('express');

const respuesta = require('../respuestas');
const controlador = require('../controllers/controlador_usu');

const router = express.Router();

// Rutas
router.get('/', get_allUsu);
router.get('/:id', get_Usu);
router.delete('/:id', del_Usu);
router.post('/', reg_Usu);
router.put('/:id', up_Usu);

// Consultar todos los usuarios
async function get_allUsu (req, res) {
    try {
        const items = await controlador.get_allUsu()
        respuesta.success(req, res, items, 200)
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
};

// Consultar un usuario por ID
async function get_Usu (req, res) {
    try {
        const items = await controlador.get_Usu(req.params.id)
        respuesta.success(req, res, items, 200)
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
};

// Eliminar un usuario por ID
async function del_Usu(req, res) {
    try {
        const resultado = await controlador.del_Usu(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario y tareas eliminados');
    } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        res.status(500).send('Error al eliminar el usuario');
    }
}

// Registrar un usuario con correo unico
async function reg_Usu(req, res) {
    const { nombre, correo, contraseña } = req.body;
    try {
        const resultado = await controlador.reg_Usu({ nombre, correo, contraseña });
        respuesta.success(req, res, resultado, 201);
    } catch (err) {
        if (err.message === 'El correo ya está registrado.') {
            return res.status(400).send(err.message);
        }
        respuesta.error(req, res, err, 500);
    }
}

// Actualizar un usuario
async function up_Usu(req, res) {
    const { nombre, correo, contraseña } = req.body;
    const id = req.params.id;

    try {
        const resultado = await controlador.up_Usu(id, { nombre, correo, contraseña });
        respuesta.success(req, res, resultado, 200);
    } catch (err) {
        if (err.message === 'El correo ya está registrado.') {
            return res.status(400).send(err.message);
        }
        respuesta.error(req, res, err, 500);
    }
}

module.exports = router;