import React from 'react'
import {Link } from 'react-router-dom'
import BasicLayout from '../../../layout/BasicLayout'
import { Form} from 'react-bootstrap';
import swal from 'sweetalert';

import './UpdateComorbilidad.scss'
export default function UpdateComorbilidad() {
  const mostrarConfirmacion=()=>{
    swal({
      title: "Eliminar",
      text:"Estas seguro que desea elinar este registro",
      icon:"warning",
      buttons: ["No","si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text: "El registro ha sido elimidado",
        icon:"success",timer:"2000"})
      }
    })
      
    
  }
  return (
    <BasicLayout className="updatecomorbilidad">
          <div className='addcomorbilidad__title'>
        <h2>Editar Comorbilidad</h2>
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
                    <br/>
                    <button className="btn btn-primary ms-1">Editar</button>
                    <Link to="/comorbilidad" className="btn btn-warning ms-1 link2">
                            Cancelar
                          </Link>
                    
                        <button href="#!" className="btn btn-danger ms-1" onClick={()=>mostrarConfirmacion()}>
                          Delete
                        </button>
                
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
