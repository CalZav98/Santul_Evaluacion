import React, { useState } from 'react';
import '../css/Tareas.css';
import { useNavigate } from 'react-router-dom';

const CrearTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reiniciar el error

    // Obtener el usuario de localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const id_usuario = usuario ? usuario.id : null; // Asegúrate de que 'id' sea la propiedad correcta

    if (!id_usuario) {
      setError('No se encontró el ID del usuario.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descripcion, estado: status, id_usuario }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la tarea');
      }

      const result = await response.text();
      console.log(result); // Muestra el mensaje de éxito en la consola
      navigate('/tareas'); // Redirige a la lista de tareas
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  const handleRegresar = () => {
    navigate('/tareas');
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
          {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
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
                className="form-control no-resize"
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
            <button type="submit" className="btn btn-crear">Crear Tarea</button>
            <button type="button" className="btn btn-regresar" onClick={handleRegresar}>Regresar</button>
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
