import React, { useState } from 'react';
import './ResetPassword.scss'; // Archivo CSS para los estilos personalizados
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores antes de hacer la petición

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
        setEmailOrUsername(''); // Limpiar el campo de entrada después de enviar el formulario
      } else {
        setError(data.message || 'Error al enviar el correo de restablecimiento.');
      }
    } catch (error) {
      setError('Error al enviar el correo de restablecimiento.');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleReset} className="reset-form">
          <div className="input-group">
            <label htmlFor="emailOrUsername">Correo electrónico o nombre de usuario</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Ingrese su correo o nombre de usuario"
              required
            />
          </div>
          <button type="submit" className="reset-button">Enviar</button>
        </form>

        {/* Mensaje de éxito o error */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
