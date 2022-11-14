import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons'
import LogoHES from '../../assets/png/logo_hnes.png';

import "./LeftMenu.scss"

export default function LeftMenu() {
  return (
    <div className='left-menu'>
      <img className='logo' src={LogoHES} alt='HES'/>

      <Link to='/'>
         <FontAwesomeIcon icon={faHome}/> Inicio</Link>
      <Link to='/pacients'>
      <FontAwesomeIcon icon={faUser}/> Pacientes</Link>
      <Link to='/loginout'>
      <FontAwesomeIcon icon={faPowerOff}/> Cerrar Sesión</Link>
    </div>
  )
}
