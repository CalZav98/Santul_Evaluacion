const db = require('../models/mysql');

const TABLA_USU = 'usuarios'

// Consultar usuarios registrados
function get_allUsu() {
    return db.get_allusuarios(TABLA_USU);
}

// Buscar un usuario por ID
function get_Usu(id) {
    return db.get_usuario(TABLA_USU, id);
}

// Eliminar toda info del usuario
async function del_Usu(id) {
    // Eliminar tareas asociadas
    await db.del_tar_usuario(id);
    
    // Eliminar el usuario
    return db.del_usuario(TABLA_USU, id);
}

// Registrar el usuario
async function reg_Usu(data) {
    return db.reg_usuario(TABLA_USU, data);
}


// Actualizar el usuario
async function up_Usu(id, data) {
    return db.up_usuario(TABLA_USU, id, data);
}

module.exports = {
    get_allUsu,
    get_Usu,
    del_Usu,
    reg_Usu,
    up_Usu
}