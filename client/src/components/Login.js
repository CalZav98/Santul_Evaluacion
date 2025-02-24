import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/santul.png';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: username, contraseña: password }),
      });

      if (!response.ok) {
        throw new Error('Error en el login');
      }

      const data = await response.json();
      console.log('Usuario:', data.usuario);
      console.log('Token:', data.token);
      
      // Se almacena el Token del usuario en sesion.
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Se redirije a la ventana de tareas.
      navigate('/tareas');
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registrar');  // Redirige a la ventana de registro
  };

  return (
    <div className="login-container">
      <header className="header"></header>

      <main className="main">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Inicio de Sesión</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">Entrar</button>
          </form>
          <p className="register-text" onClick={handleRegisterRedirect}>
            ¿No tienes una cuenta? <span className="register-link">Registrarse</span>
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
