const db = require('../models/mysql');

const TABLA_TAR = 'tareas'


function get_allTar() {
    return db.get_alltareas(TABLA_TAR);
}

function get_Tar(id) {
    return db.get_tarea(TABLA_TAR, id);
}

function del_Tar(id) {
    return db.del_tarea(TABLA_TAR, id);
}

async function reg_Tar(data) {
    return db.reg_tarea(TABLA_TAR, data);
}

async function up_Tar(id, data) {
    return db.up_tarea(TABLA_TAR, id, data);
}

async function get_TareasPorUsuario(id_usuario) {
    const tareas = await db.get_alltareasPorUsuario(TABLA_TAR, id_usuario);
    console.log('Tareas obtenidas:', tareas);
    return tareas || [];
}

module.exports = {
    get_allTar,
    get_Tar,
    del_Tar,
    reg_Tar,
    up_Tar,
    get_TareasPorUsuario
}