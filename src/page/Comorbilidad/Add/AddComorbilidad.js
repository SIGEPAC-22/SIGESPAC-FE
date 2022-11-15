import React from 'react'
import {Link } from 'react-router-dom'
import BasicLayout from '../../../layout/BasicLayout'
import { Form, Button, Spinner} from 'react-bootstrap';

import './AddComorbilidad.scss'
export default function AddComorbilidad() {
  return (
    <BasicLayout className="addcomorbilidad">
        <div className='addcomorbilidad__title'>
        <h2>Agregar Comorbilidad</h2>
    </div>
    <>
    <div className="container col-md-7">
            <br/>
            <div className="card-header">
              <div className="card-body shadow-lg p-3">
              <form>
                <div className='form-group'>
                <Form.Group>
            <Form.Control 
            type="text"
            name='user'
            placeholder='Data 1' 
            onChange={''}
            defaultValue={''}
            />
        </Form.Group>
        <Form.Group>
            <Form.Control 
            type="text"
            name='user'
            placeholder='Data 2' 
            onChange={''}
            defaultValue={''}
            />
        </Form.Group>
        <Form.Group>
            <Form.Control 
            type="text"
            name='user'
            placeholder='Data 3' 
            onChange={''}
            defaultValue={''}
            />
        </Form.Group>
        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr/>
                          <button className="btn btn-primary">Registrar</button>
                          <Link to="/comorbilidad" className="btn btn-warning ms-1 link2">
                            Cancelar
                          </Link>
                        </div>
     
                </div>
              </form>
              </div>
            </div>
          </div>
    </>
    </BasicLayout>
  )
}
