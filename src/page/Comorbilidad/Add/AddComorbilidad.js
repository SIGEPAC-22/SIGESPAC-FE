import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import {URL_ADD_COMORBILIDAD} from "../../../utils/constant"
import swal from 'sweetalert';

import "./AddComorbilidad.scss";
export default class AddComorbilidad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comorbilidad: {
        nameComorbidity: "",
        descriptionComorbidity: "",
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

    const url = `${URL_ADD_COMORBILIDAD}`;

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
          if (data.responseCode === 200) {
          this.setState(()=>{
            swal({
              title: "Exito al Guardar",
              text: "Se agrego correctamente el registro",
              icon:"success",
              timer: "2000",
              buttons: false,
          }).then(function(){
            window.location="/comorbilidad"
          })
          });
        }else {
          this.setState(() => {
            swal({
              title: "Error al Guardar",
              text: "Error el registro no se realizo con exito, intentelo nuevamente",
              icon: "error",
              timer: "2000",
              buttons: false,
            }).then(function () {
              window.location = "/comorbilidad";
            });
          });
        }
        }
      }).catch((error) => {
        this.setState(() => {
          swal({
            title: "Error",
            text:
              "No hubo comunicacion exitosa con el servidor, intentelo nuevamente " +
              "Error:" +
              error,
            icon: "error",
            button: "OK",
          }).then(function () {
            window.location = "/comorbilidad";
          });
        });
      })
  };

  componentDidMount() {
    this.setState({
      comorbilidad: {
        nameComorbidity: "",
        descriptionComorbidity: "",
      },
      isLoaded: true,
    });
  }

  render() {
    let { comorbilidad, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="addcomorbilidad">
            <div className="addcomorbilidad__title">
              <h2>Agregar Comorbilidad</h2>
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
                            name="nameComorbidity"
                            placeholder="nombre comorbilidad"
                            onChange={""}
                            defaultValue={comorbilidad.nameComorbidity}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionComorbidity"
                            placeholder="Descripcion comorbilidad"
                            onChange={""}
                            defaultValue={comorbilidad.descriptionComorbidity}
                            required
                          />
                        </Form.Group>
                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr />
                          <button className="btn btn-primary">Registrar</button>
                          <Link
                            to="/comorbilidad"
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
