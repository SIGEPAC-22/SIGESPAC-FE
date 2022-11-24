import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUsers,
    faFileMedical,
    faFileWaveform,
    faHeadSideVirus,
    faHeadSideCough,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons'
import { logoutApi } from '../../api/auth'
import LogoHES from '../../assets/png/logo_hnes.png';

import "./LeftMenu.scss"

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;

  const logout =() =>{
    logoutApi();
    setRefreshCheckLogin(true);
  }
  return (
    <div className='left-menu'>
      <img className='logo' src={LogoHES} alt='HES'/>

      <Link to='/'>
         <FontAwesomeIcon icon={faHome}/> Inicio</Link>

         
      <Link to='/pacientes'>
      <FontAwesomeIcon icon={faUser}/> Pacientes</Link>
      <Link to='/personal'>
      <FontAwesomeIcon icon={faUsers}/> Personal</Link>
      <Link to='/expediente'>
      <FontAwesomeIcon icon={faFileMedical}/> Expediente</Link>
      <Link to='/historial'>
      <FontAwesomeIcon icon={faFileWaveform}/> Historial</Link>
      <Link to='/comorbilidad'>
      <FontAwesomeIcon icon={ faHeadSideVirus}/> Comorbilidades</Link>
      <Link to='/sintomas'>
      <FontAwesomeIcon icon={ faHeadSideCough}/> Sintomas </Link>
      <Link to='  ' onClick ={logout}>
      <FontAwesomeIcon icon={faPowerOff}/> Cerrar Sesión</Link>

    </div>
  )
}
