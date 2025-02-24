import React, { useState } from 'react';
import logo from '../img/santul.png';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <header className="header">
      </header>

      <main className="main">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Inicio de Sesión</h2>
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
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;

