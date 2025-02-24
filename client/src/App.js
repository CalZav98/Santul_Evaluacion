import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import NoEncontrado from './pages/NoEncontrado';
import Login from './components/Login';
import ListaTareas from './components/ListaTareas';
import CrearTarea from './components/CrearTarea';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tareas" element={<ListaTareas />} />
          <Route path="/crear-tarea" element={<CrearTarea />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
