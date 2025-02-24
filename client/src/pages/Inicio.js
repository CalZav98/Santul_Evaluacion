import React from 'react';
import logo from '../img/santul.png';

const Inicio = () => {
  return (
    <div className="d-flex flex-column min-vh-100 m-0">
      

      <main className="flex-grow-1">
        <div className="container-fluid my-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <img src={logo} alt="Logo" className="mb-4" style={{ maxWidth: '200px' }} />
              <h1 className="mb-4" style={{ color: '#D11919' }}>Evaluación</h1>
              <p className="lead mb-5">Programa de evaluación para el puesto de desarrollador de software.</p>
              <a href="/login" className="btn btn-danger btn-lg">Iniciar Sesión</a>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Inicio;
