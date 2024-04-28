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
  const gerenteUser = { username: 'Gerente', password: '123' };
  const coordinadorUser = { username: 'Coordinador', password: '123' };
  const contadorUser = { username: 'Contador', password: '123' };
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === gerenteUser.username && password === gerenteUser.password) {
      setShowMessage('Login successful!');
      navigate('/Gerente');
    }
      if (username === coordinadorUser.username && password === coordinadorUser.password) {
        setShowMessage('Login successful!');
        navigate('/Coordinador'); 
      }
      if (username === contadorUser.username && password === contadorUser.password) {
      setShowMessage('Login successful!');
      navigate('/Contador'); 
  
    } else {
      setShowMessage('Invalid username or password');
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

          <div className="footerDiv Flex">
            <span className="text"> Registrarse </span>
            <Link to={'/Register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>


        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={imagen} alt="Logo Image"/>
            <h3>Bienvenidos</h3>
          </div>


          <form action="" className='form grid' onSubmit={handleLogin}>
            <span className='showMessage'>{showMessage}</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input Flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username'/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input Flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password'/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Olvido su contraseña? <a href ="">Click Aqui</a>
            </span>
          </form>

        </div>

      </div>
    </div>
  );
}

export default Login;
