import React, { useState } from 'react';
import '../css/TareasTab.css';

const TasksTable = () => {
  const [tasks, setTasks] = useState([
    {
      title: 'Tarea 1',
      description: 'Descripción de la tarea 1',
      status: 'Pendiente',
      date: '2023-04-15',
    },
    {
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      status: 'En Progreso',
      date: '2023-04-20',
    },
    {
      title: 'Tarea 3',
      description: 'Descripción de la tarea 3',
      status: 'Completada',
      date: '2023-04-25',
    },
    // Puedes agregar más tareas aquí
  ]);

  const handleEdit = (index) => {
    // Lógica para editar la tarea
    console.log(`Editando tarea ${index}`);
  };

  const handleDelete = (index) => {
    // Lógica para eliminar la tarea
    console.log(`Eliminando tarea ${index}`);
    setTasks(tasks.filter((_, i) => i !== index)); // Elimina la tarea del estado
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
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No hay tareas registradas.</td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>{task.date}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(index)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(index)}>
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

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default TasksTable;
