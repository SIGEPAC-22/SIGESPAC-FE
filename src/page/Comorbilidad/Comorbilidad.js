import React from 'react';
import { Button, Spinner} from 'react-bootstrap';
import { WhithRouter } from 'react-router-dom';
import BasicLayout from '../../layout/BasicLayout'

import './Comorbilidad.scss'

export default function Comorbilidad(props) {
    console.log(props);
  return (
   <BasicLayout className="comorbilidad">
    <div className='comorbilidad__title'>
        <h2>Comorbilidades</h2>
    </div>
    <div>Banner Usuario</div>
    <div className='comorbilidad__tweets'>Lista de comorbilidad</div>
   </BasicLayout>
  )
}
