import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Registrar.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: name, correo: email, contraseña: password }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const data = await response.json();
            console.log('Usuario registrado:', data);
            // Redirigir a la ventana de login después del registro exitoso
            navigate('/login');
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        }
    };


    return (
        <div className="login-container">
            <header className="header"></header>

            <main className="main">
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Registro</h2>
                        {error && <p className="error">{error}</p>}
                        <div className="input-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="input-group">
                            <label htmlFor="confirm-password">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit-button">Registrar</button>
                    </form>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2025 Santul. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Register;
