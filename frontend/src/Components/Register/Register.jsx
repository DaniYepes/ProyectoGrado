import React, { useState } from 'react';
import './Register.css';
import '../../App.scss';
import { Link } from 'react-router-dom';

import video from '../../LoginAssets/video.mp4';
import imagen from '../../LoginAssets/ImagenMAG.jpg';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { IoPeople } from 'react-icons/io5';

const Register = () => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    email: '',
    role: 'Gerente',
    username: '',
    password: '',
    nombre_completo: '',  // Nuevo campo para nombre completo
  });

  // Función para manejar los cambios en los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Función para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Enviar formData con `nombre_completo`
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      alert('Registro exitoso');
    } catch (error) {
      alert(error.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>MAG EFFICIENT ACCOUNTANTS S.A.S</h2>
          </div>

          <div className="footerDiv Flex">
            <Link to={'/Gerente'}>
              <button className='btn'>Retroceder</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={imagen} alt="Logo Image" />
            <h3>Registro nuevos empleados</h3> {/* Cambio de texto */}
          </div>

          <form className='form grid' onSubmit={handleRegister}>
            {/* Campo de nombre completo */}
            <div className="inputDiv">
              <label htmlFor="nombre_completo">Nombre Completo</label>
              <div className="input Flex">
                <FaUserShield className='icon' />
                <input 
                  type="text" 
                  id='nombre_completo' 
                  value={formData.nombre_completo} 
                  onChange={handleInputChange} 
                  placeholder='Ingresa tu nombre completo' 
                  required 
                />
              </div>
            </div>

            {/* Campo de email */}
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input Flex">
                <FaUserShield className='icon' />
                <input 
                  type="email" 
                  id='email' 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder='Enter email' 
                  required 
                />
              </div>
            </div>

            {/* Campo de selección de rol */}
            <div className="inputDiv">
              <label htmlFor="role">Rol</label>
              <div className="input Flex">
                <IoPeople className='icon' />
                <select 
                  id='role' 
                  value={formData.role} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="Gerente">Gerente</option>
                  <option value="Coordinador">Coordinador</option>
                  <option value="Contador">Contador</option>
                </select>
              </div>
            </div>

            {/* Campo de nombre de usuario */}
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input Flex">
                <FaUserShield className='icon' />
                <input 
                  type="text" 
                  id='username' 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  placeholder='Enter Username' 
                  required 
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input Flex">
                <BsFillShieldLockFill className='icon' />
                <input 
                  type="password" 
                  id='password' 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  placeholder='Enter Password' 
                  required 
                />
              </div>
            </div>

            {/* Botón de registro */}
            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Register;
