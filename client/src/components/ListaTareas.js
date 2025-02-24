import React, { useEffect, useState } from 'react';

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);

  

  const handleDelete = (id) => {
    // Lógica para eliminar tarea
  };

  const handleEdit = (id) => {
    // Lógica para editar estado de tarea
  };

  useEffect(() => {
    // Lógica para obtener las tareas del usuario autenticado
    const fetchTareas = async () => {
      const response = await fetch('/tareas'); // Cambia esto según tu API
      const data = await response.json();
      setTareas(data);
    };
    
    fetchTareas();
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul className="list-group">
        {tareas.map(task => (
          <li key={task.id} className="list-group-item">
            {task.title}
            {/* Botones para editar y eliminar */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;
