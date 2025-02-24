import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TareasTab.css';

const TasksTable = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      if (token && usuario) {
        try {
          const response = await fetch(`http://localhost:4000/api/tareas/usuario/${usuario.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener las tareas');
          }

          const data = await response.json();
          console.log('Datos recibidos:', data);

          // Verifica si hay tareas y si son un arreglo
          if (Array.isArray(data.body)) {
            setTasks(data.body);
          } else {
            setError('La respuesta no es un arreglo de tareas.');
          }
        } catch (err) {
          setError(err.message);
          console.error('Error:', err);
        }
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-tarea/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminando tarea con ID: ${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = () => {
    navigate('/crear-tarea');
  };

  return (
    <div className="tasks-container">
      <header className="header">
        <div className="header-content">
          <h1>Tareas Registradas</h1>
        </div>
      </header>

      <main className="main">
        <div className="table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {error && <tr><td colSpan="5" style={{ textAlign: 'center' }}>{error}</td></tr>}
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No hay tareas registradas.</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.titulo}</td>
                    <td>{task.descripcion}</td>
                    <td>{task.estado}</td>
                    <td>{new Date(task.fecha_creacion).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(task.id)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      
      <div className="add-task-container" style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          className="btn"
          style={{ backgroundColor: '#28a745', color: 'white' }}
          onClick={handleAddTask}
        >
          Agregar Tarea
        </button>
      </div>

      <br />

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default TasksTable;
