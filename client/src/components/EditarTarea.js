// EditarTarea.js
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
    fetchTask();
  }, [id]);

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
      console.log(data); // Log para verificar la respuesta

      // Verifica si data es un array y tiene al menos un elemento
      if (Array.isArray(data) && data.length > 0) {
        const tarea = data[0]; // Obtén el primer elemento del array
        setTitulo(tarea.titulo);
        setDescripcion(tarea.descripcion);
        setStatus(tarea.estado);
      } else {
        console.error('Datos de tarea incompletos:', data); // Log de error específico
        throw new Error('Datos de tarea incompletos');
      }
    } catch (err) {
      console.error('Error en fetchTask:', err.message); // Log del error
      setError(err.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id_usuario = JSON.parse(localStorage.getItem('usuario')).id; // Asegúrate de obtener el ID correctamente

    const taskData = { titulo, descripcion, status, id_usuario }; // Asegúrate de incluir todos los campos necesarios
    console.log('Datos a enviar:', taskData); // Log de datos a enviar

    try {
        const response = await fetch(`http://localhost:4000/api/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura el mensaje de error
            throw new Error(`Error al editar la tarea: ${errorData.message}`);
        }

        console.log('Tarea editada exitosamente');
        navigate('/tareas');
    } catch (err) {
        console.error('Error en handleSubmit:', err.message);
        setError(err.message);
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
          {error && <p className="error">{error}</p>}
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
