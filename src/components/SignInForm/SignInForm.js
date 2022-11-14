import React, { useState } from 'react';
import { Form, Button, Spinner} from 'react-bootstrap';
import { values, size} from 'lodash'
import swal from 'sweetalert';
import { singInApi, setStatusApi } from '../../api/auth'

import "./SignInForm.scss"

export default function SignInForm( props) {
    const {setRefreshCheckLogin} = props;
    const [formData, setFormData] =useState(initialFormValue());
    const[signInLoading, setSignInLoading] = useState(false);

    
    const onSubmit = e =>{
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
          value && validCount++;
          return null;
        });

        if(size(formData) !== validCount){
            swal({
                title: "Atención",
                text: "Complete todos los campos del formulario",
                icon:"warning",
                timer: "3000",
                buttons: false,
            });
        }else{
            setSignInLoading(true);
            singInApi(formData).then(response =>{
                if(response.message){
                    swal({
                        title: "Error",
                        text: "Fallo la conexion con el servidor",
                        icon:"error",
                        timer: "2000",
                        buttons: false,
                    })
                } else{
                    if (response.status === false){
                    swal({
                        title: "Warning",
                        text: "Usuario y/o Contraseña incorrectos",
                        icon:"warning",
                        timer: "2000",
                        buttons: false,
                    })
                    }else{
                        setStatusApi(response.status);
                        setRefreshCheckLogin(true);
                    }
                    
                }
            }).catch(() =>{
                swal({
                    title: "Error",
                    text: "Error del Servidor, Inténtelo más tarde",
                    icon:"error",
                    timer: "2000",
                    buttons: false,
                });
            }).finally(()=>{
                setSignInLoading(false);
            });
        }
    };

    const onChange = e =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };
  return (
    <div className='sign-in-form '>
      <h2>Ingrese sus credenciales</h2>
      <Form onSubmit={onSubmit} className='form-group'>
        <Form.Group>
            <Form.Control 
            type="text"
            name='user'
            placeholder='Usuario' 
            onChange={onChange}
            defaultValue={formData.user}
            />
        </Form.Group>

        <Form.Group>
            <Form.Control 
            type="password"
            name="password"
            placeholder='Contraseña'
            onChange={onChange}
            defaultValue={formData.pass}/>
        </Form.Group>
        <Button variant='primary' type='submit'>
            {!signInLoading ? "Iniciar Sesión" :<Spinner animation='border'/>}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue(){
    return{
        user:"",
        password:""
    };
}
