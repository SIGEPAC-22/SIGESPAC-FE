import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import {URL_ADD_SINTOMA} from "../../../utils/constant"
import swal from 'sweetalert';

import "./AddSintomas.scss";
export default class AddSintomas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sintoma: {
        namesymptom: "",
        descriptionSymptom: "",
      },
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cancel(){
    document.getElementById("format").reset();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    const url = `${URL_ADD_SINTOMA}`;

    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(url,params)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            alert: { type: "alert-danger", message: data.error.message },
          });
        } else {
          this.cancel();
          this.setState(()=>{
            swal({
              title: "Exito al Guardar",
              text: "Se agrego correctamente el registro de Sintoma",
              icon:"success",
              timer: "2000",
              buttons: false,
          }).then(function(){
            window.location="/sintomas"
          })
          });
        }
      });
  };

  componentDidMount() {
    this.setState({
      sintoma: {
        namesymptom: "",
        descriptionSymptom: "",
      },
      isLoaded: true,
    });
  }

  render() {
    let { sintoma, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="addsintomas">
            <div className="addsintomas__title">
              <h2>Agregar Sintomas</h2>
            </div>
            <>
              <div className="container col-md-7">
                <br />
                <div className="card-header">
                  <div className="card-body shadow-lg p-3">
                    <form onSubmit={this.handleSubmit} id="format">
                      <div className="form-group">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="namesymptom"
                            placeholder="Nombre de Sintoma"
                            onChange={""}
                            defaultValue={sintoma.namesymptom}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionSymptom"
                            placeholder="Descripcion de Sintoma"
                            onChange={""}
                            defaultValue={sintoma.descriptionSymptom}
                            required
                          />
                        </Form.Group>
                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr />
                          <button className="btn btn-primary">Registrar</button>
                          <Link
                            to="/sintomas"
                            className="btn btn-warning ms-1 link2"
                          >
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
        </Fragment>
      );
    }
  }
}
