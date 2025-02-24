import React, { useState } from 'react';
import '../css/Tareas.css';

const CrearTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [status, setStatus] = useState('pendiente');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear tarea
    console.log({ titulo, descripcion, status });
  };

  return (
    <div className="tasks-container">
      <header className="header">
        <div className="header-content">
          <h1>Registrar Nueva Tarea</h1>
        </div>
      </header>
      <main className="main">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Título</label>
              <input 
                type="text" 
                className="form-control" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                className="form-control" 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select 
                className="form-control" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Crear Tarea</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CrearTarea;

