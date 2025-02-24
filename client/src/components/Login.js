import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/login', {
        correo: email,
        contraseña: password,
      });

      // Manejar la respuesta exitosa
      console.log('Login exitoso:', response.data);
      // Aquí puedes guardar el token en el almacenamiento local o en el contexto global
      // localStorage.setItem('token', response.data.token);
    } catch (err) {
      // Manejar errores
      if (err.response && err.response.status === 401) {
        setError('Credenciales incorrectas.'); // Error de autenticación
      } else {
        setError('Error en el servidor. Por favor, inténtalo más tarde.'); // Otro error
      }
      console.error('Error en el login:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
    </form>
  );
};

export default Login;


