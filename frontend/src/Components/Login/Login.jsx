import React, { useState } from 'react';
import './Login.css';
import '../../App.scss';
import { Link, useNavigate } from 'react-router-dom';
import video from '../../LoginAssets/video.mp4';
import imagen from '../../LoginAssets/ImagenMAG.jpg';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();
    const nombre_completo = event.target.password.value.trim();

    if (!username || !password) {
      setShowMessage('Por favor ingrese su usuario y contraseña');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      console.log("Data received:", data); // Verificar qué se está recibiendo

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      localStorage.setItem('nombre_completo', data.nombre_completo);

      if (data.role === 'Gerente') navigate('/Gerente');
      else if (data.role === 'Coordinador') navigate('/Coordinador');
      else if (data.role === 'Contador') navigate('/Contador');
    } catch (error) {
      setShowMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className='loginPage flex'>
      <div className="container flex">
        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className='title'>MAG EFFICIENT ACCOUNTANTS S.A.S</h2>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={imagen} alt="Logo Image" />
            <h3>Bienvenidos</h3>
          </div>
          <form className='form grid' onSubmit={handleLogin}>
            <span className='showMessage'>{showMessage}</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input Flex">
                <FaUserShield className='icon' />
                <input type="text" id='username' name='username' placeholder='Enter Username' />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input Flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' name='password' placeholder='Enter Password' />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon' />
            </button>
            <span className='forgotPassword'>
              ¿Olvidó su contraseña? <Link to="/reset-password">Click Aquí</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
