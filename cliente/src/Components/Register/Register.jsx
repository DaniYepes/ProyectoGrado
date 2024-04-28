import React from 'react'
import './Register.css'
import '../../App.scss'
import {Link} from 'react-router-dom'

import video from '../../LoginAssets/video.mp4'
import imagen from '../../LoginAssets/ImagenMAG.jpg'

import{FaUserShield} from 'react-icons/fa'
import{BsFillShieldLockFill} from 'react-icons/bs'
import{AiOutlineSwapRight} from 'react-icons/ai'
import{MdMarkEmailRead} from 'react-icons/md'
import{IoPeople} from 'react-icons/io5'

const Register = () => {
  return (

    <div className='registerPage flex'>
      <div className= "container flex">

        <div className='videoDiv'>
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
          <h2 className='title'>MAG EFFICIENT ACCOUNTANTS S.A.S</h2>
          
        </div>

        <div className="footerDiv Flex">
          <span className="text"> Tienes cuenta? </span>
          <Link to={'/'}>
          <button className='btn'>Login</button>
          </Link>
        </div>
        </div>


        <div className="formDiv flex">
          <div className="headerDiv">
          <img src={imagen} alt="Logo Image"/>
          <h3>Dejanos conocerte</h3>
        </div>

        
        <form action="" className='form grid'>
          
        <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input Flex">
              <MdMarkEmailRead className='icon'/>
              <input type="email" id='email' placeholder='Enter email'/>
            </div>
          </div>

        <div className="inputDiv">
            <label htmlFor="rol">Rol</label>
            <div className="input Flex">
              <IoPeople className='icon'/>
              <input type="rol" id='rol' placeholder='Enter rol'/>
            </div>
          </div>

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
            <span>Register</span>
            <AiOutlineSwapRight className='icon'/>
          </button>  

          <span className='forgotPassword'>
            Olvido su contraseña? <a href ="">Click Aqui</a>
          </span>
        </form>

      </div>

    </div>
    </div>
  )
}

export default Register