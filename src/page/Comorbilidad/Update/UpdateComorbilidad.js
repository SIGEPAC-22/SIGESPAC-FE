import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../../../utils/Alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import swal from "sweetalert";
import {
  URL_UPDATE_COMORBILIDAD,
  URL_GET_ONE_COMORBILIDAD,
  URL_DELETE_COMORBILIDAD,
} from "../../../utils/constant";

import "./UpdateComorbilidad.scss";
export default class UpdateComorbilidad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comorbilidad: {
        id: 0,
        nameComorbidity: "",
        descriptionComorbidity: "",
      },
      isLoaded: false,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cancel() {
    document.getElementById("format").reset();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${process.env.REACT_APP_URL_UPDATE_COMORBIDITY}?id=${id}`;

    const params = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            alert: { type: "alert-danger", message: data.error.message },
          });
        } else {
          if (data.responseCode === 200) {
          this.setState(() => {
            swal({
              title: "Exito al Actualizar",
              text: "Se actualizó correctamente el registro",
              icon: "success",
              timer: "2000",
              buttons: false,
            }).then(function () {
              window.location = "/comorbilidad";
            });
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
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${process.env.REACT_APP_URL_GET_ONE_COMORBIDITY}?id=${id}`;

    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (id > 0) {
      fetch(url, params)
        .then((response) => {
          if (response.status !== "200") {
            let err = Error;
            err.Message = "Invalid response code: " + response.status;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then((result) => {
          this.setState(
            {
              comorbilidad: {
                id: id,
                nameComorbidity: result.nameComorbidity,
                descriptionComorbidity: result.descriptionComorbidity,
              },
              isLoaded: true,
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
        });
    } else {
      this.setState({ isLoaded: true });
    }
  }

  confirmDelete = () => {
    const url = `${process.env.REACT_APP_URL_DELETE_COMORBIDITY}?id=${this.state.comorbilidad.id}`;

    const params = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    confirmAlert({
      title: "Eliminar este registro",
      message: "¿Estas seguro?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            fetch(url, params)
              .then((response) => response.json)
              .then((data) => {
                if (data.error) {
                  this.setState({
                    alert: {
                      type: "alert-danger",
                      message: data.error.message,
                    },
                  });
                }
                window.location = "/comorbilidad";
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    let { comorbilidad, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <Alert
            alertType={this.state.alert.type}
            alertMessage={this.state.alert.message}
          />
          <BasicLayout className="updatecomorbilidad">
            <div className="addcomorbilidad__title">
              <h2>Editar Comorbilidad</h2>
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
                            type="hidden"
                            name="id"
                            onChange={this.handleChange}
                            defaultValue={comorbilidad.id}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="nameComorbidity"
                            placeholder="Data 2"
                            defaultValue={comorbilidad.nameComorbidity}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionComorbidity"
                            placeholder="Data 3"
                            defaultValue={comorbilidad.descriptionComorbidity}
                            required
                          />
                        </Form.Group>

                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <br />
                          <button className="btn btn-primary ms-1">
                            Editar
                          </button>
                          <Link
                            to="/comorbilidad"
                            className="btn btn-warning ms-1 link2"
                          >
                            Cancelar
                          </Link>

                          <Link className="btn btn-danger ms-1 button2">
                            {comorbilidad.id > 0 && (
                              <a
                                href="#!"
                                className="texta"
                                onClick={() => this.confirmDelete()}
                              >
                                Delete
                              </a>
                            )}
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
