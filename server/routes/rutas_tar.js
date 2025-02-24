const express = require('express');
const respuesta = require('../respuestas');
const controlador = require('../controllers/controlador_tar');
const router = express.Router();

// Rutas
router.get('/', get_allTar);
router.get('/:id', get_Tar);
router.delete('/:id', del_Tar);
router.post('/', reg_Tar);
router.put('/:id', up_Tar);

// 
router.get('/usuario/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;
    try {
        const items = await controlador.get_TareasPorUsuario(id_usuario);
        respuesta.success(req, res, items, 200); // Asegúrate de que items sea un arreglo
    } catch (err) {
        console.error('Error al obtener tareas:', err);
        respuesta.error(req, res, err.message || 'Error interno del servidor', 500);
    }
});



// Consultar todas las tareas
async function get_allTar (req, res) {
    try {
        const items = await controlador.get_allTar()
        respuesta.success(req, res, items, 200)
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
};

// Consultar una tarea por ID
async function get_Tar (req, res) {
    try {
        const items = await controlador.get_Tar(req.params.id)
        respuesta.success(req, res, items, 200)
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
};

// Eliminar una tarea por ID
async function del_Tar(req, res) {
    try {
        const resultado = await controlador.del_Tar(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.send('Tarea eliminada');
    } catch (err) {
        console.error('Error al eliminar la tarea:', err);
        res.status(500).send('Error al eliminar la tarea');
    }
}

// Registrar una tarea
async function reg_Tar(req, res) {
    const { titulo, descripcion, estado, id_usuario } = req.body;

    // Validar el estado
    const estadosValidos = ['pendiente', 'en progreso', 'completado'];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).send('Estado no válido. Debe ser "pendiente", "en progreso" o "completado".');
    }

    try {
        const resultado = await controlador.reg_Tar({ titulo, descripcion, estado, id_usuario });
        res.status(201).send('Tarea registrada');
    } catch (err) {
        if (err.message === 'Usuario no válido.') {
            return res.status(400).send(err.message);
        }
        res.status(500).send('Error interno del servidor');
    }
}

// Actualizar una tarea
async function up_Tar(req, res) {
    const { titulo, descripcion, estado, id_usuario } = req.body;
    const id = req.params.id;

    // Validar el estado
    const estadosValidos = ['pendiente', 'en progreso', 'completado'];
    if (estado && !estadosValidos.includes(estado)) {
        return res.status(400).send('Estado no válido. Debe ser "pendiente", "en progreso" o "completado".');
    }

    try {
        const resultado = await controlador.up_Tar(id, { titulo, descripcion, estado, id_usuario });
        res.status(200).send('Tarea actualizada');
    } catch (err) {
        if (err.message === 'Usuario no válido.') {
            return res.status(400).send(err.message);
        }
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = router;