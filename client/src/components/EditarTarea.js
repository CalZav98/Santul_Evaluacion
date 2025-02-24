import React, { useEffect, useState } from 'react';
import '../css/Tareas.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditarTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:4000/api/tareas/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la tarea');
        }

        const data = await response.json();
        console.log('Datos de la tarea:', data); // Verifica la estructura de los datos

        // Asegúrate de que los datos contengan las propiedades esperadas
        if (data.titulo && data.descripcion && data.estado) {
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setStatus(data.estado);
        } else {
          throw new Error('Datos de tarea incompletos');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error:', err); // Muestra el error en la consola
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/api/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descripcion, estado: status }),
      });

      if (!response.ok) {
        throw new Error('Error al editar la tarea');
      }

      navigate('/tareas');
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const handleRegresar = () => {
    navigate('/tareas');
  };

  return (
    <div className="tasks-container">
      <header className="header">
        <div className="header-content">
          <h1>Editar Tarea</h1>
        </div>
      </header>
      <main className="main">
        <div className="form-container">
          {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error */}
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
            <button type="submit" className="btn btn-crear">Editar Tarea</button>
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

export default EditarTarea;
