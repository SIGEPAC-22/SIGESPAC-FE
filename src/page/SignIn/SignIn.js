import React, { useState } from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import logoES from "../../assets/png/logo_el_salavador.png";
import logoHES from "../../assets/png/logo_hnes.png";

import BasicModal from '../../components/Modal/BasicModal';
import SignInForm from '../../components/SignInForm';
import "./SignIn.scss";

export default function SignIn(props) {
  const {setRefreshCheckLogin} = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const openModal = content =>{
    setShowModal(true);
    setContentModal(content)
  }



  return (
    <>
      <Container className="signin" fluid>
      <Row>
          <LeftComponent/>
          <RightComponent
            openModal ={openModal}
            setShowModal = {setShowModal}
            setRefreshCheckLogin = {setRefreshCheckLogin}
          />
      </Row>
    </Container>
    <BasicModal
      show={showModal} setShow={setShowModal}>
      {contentModal}
    </BasicModal>
    </>
    
  );
}


function LeftComponent(){
  return(
    <Col className='signin__left' xs={6}>
    <img src={logoES} alt='HospitalElSalvador'/>
    </Col>
  )
}

function RightComponent(props){
  const{ openModal, setRefreshCheckLogin} = props;
  return(
    <Col className='signin__right' xs={6}>
    <div>
      <img src={logoHES} alt="hes"/>
      <h2>Iniciar Sesión en SIGESPAC</h2>
      <Button 
      variant='outline-primary'
      onClick={()=> openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin}/>
      )
    }
      >
        Iniciar Sesión
      </Button>
    </div>
    </Col>
  )
}