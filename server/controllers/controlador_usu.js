const db = require('../models/mysql');
const jwt = require('jsonwebtoken');

const TABLA_USU = 'usuarios'


// Login 
async function login(data) {
    const { correo, contraseña } = data;
    console.log(`Buscando usuario con correo: ${correo}`);
    const usuario = await db.login_usuario(correo, contraseña);
    console.log(`Usuario encontrado: ${usuario}`);

    // Generar un token JWT
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    console.log(`Token generado: ${token}`);

    return { usuario, token };
}

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
    up_Usu,
    login
}