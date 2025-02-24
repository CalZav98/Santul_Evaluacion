import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reiniciar el error

    try {
        // Cambia la URL a la de tu API de inicio de sesión
        const response = await axios.post('http://localhost:4000/usuarios', {
            correo: email, // Cambia 'email' a 'correo'
            contraseña: password, // Cambia 'password' a 'contraseña'
        });

        // Manejar la respuesta de la API
        if (response.status === 200) {
            // Aquí puedes guardar el token en localStorage o en el estado global
            localStorage.setItem('token', response.data.token);
            // Redirigir o mostrar un mensaje de éxito
            console.log('Inicio de sesión exitoso:', response.data);
        }
    } catch (err) {
        if (err.response) {
            // El servidor respondió con un código de estado fuera del rango de 2xx
            console.error('Error de respuesta del servidor:', err.response);
            setError(err.response.data.message || 'test');
        } else if (err.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            setError('No se recibió respuesta del servidor');
        } else {
            // Ocurrió un error al configurar la solicitud
            setError('Error al configurar la solicitud: ' + err.message);
        }
        console.log(err)
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

