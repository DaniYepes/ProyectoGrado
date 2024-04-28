import React from 'react'
import './Login.css'
import '../../App.scss'
import {Link} from 'react-router-dom'

import video from '../../LoginAssets/video.mp4'
import imagen from '../../LoginAssets/ImagenMAG.jpg'

import{FaUserShield} from 'react-icons/fa'
import{BsFillShieldLockFill} from 'react-icons/bs'
import{AiOutlineSwapRight} from 'react-icons/ai'

const Login = () => {
  return (

    <div className='loginPage flex'>
      <div className= "container flex">

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

        
        <form action="" className='form grid'>
          <span className='showMessage'>Login status</span>

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
              <input type="text" id='password' placeholder='Enter Password'></input>
            </div>
          </div>

          <button type='submit' className='btn flex'>
            <span>Login</span>
            <AiOutlineSwapRight className='icon'/>
          </button>  

          <a href="/Gerente"> Interfaz Gerente</a>

          <span className='forgotPassword'>
            Olvido su contraseña? <a href ="">Click Aqui</a>
          </span>
        </form>

      </div>

    </div>
    </div>
  )
}

export default Login