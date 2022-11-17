import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../../../utils/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import swal from 'sweetalert';
import {
  URL_UPDATE_SINTOMAS,
  URL_GET_ONE_SINTOMAS,
  URL_DELETE_SINTOMAS,
} from "../../../utils/constant";

import "./UpdateSintomas.scss";
export default class UpdateSintomas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sintoma: {
        id: 0,
        nameSymptom: "",
        descriptionSymptom: "",
      },
      isLoaded: false,
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  cancel(){
    document.getElementById("format").reset();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    let errors = [];
    if (this.state.sintoma.nameSymptom === "") {
      errors.push("nameSymptom");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${URL_UPDATE_SINTOMAS}?id=${id}`;

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
          this.setState(()=>{
            swal({
              title: "Exito al Actualizar",
              text: "Se actualizó correctamente el registro de sintoma",
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

  //si no se usa borrar
  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      sintoma: {
        ...prevState.sintoma,
        [name]: value,
      },
    }));
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${URL_GET_ONE_SINTOMAS}?id=${id}`;

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
             sintoma: {
                id: id,
                nameSymptom: result.nameSymptom,
                descriptionSymptom: result.descriptionSymptom,
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

  confirmDelete = (e) => {

    
    const url = `${URL_DELETE_SINTOMAS}?id=${this.state.sintoma.id}`;

    const params = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    confirmAlert({
      title: "Eliminar sintoma",
      message: "Estas seguro?",
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
                } else {
                  this.props.history.push({
                    pathname: "/sintomas",
                  });
                }
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
    let { sintoma, isLoaded, error } = this.state;

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
          <BasicLayout className="updatesintomas">
            <div className="addsintomas__title">
              <h2>Editar Sintomas</h2>
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
                            defaultValue={sintoma.id}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            className={
                              this.hasError("nameSymptom")
                                ? "is-invalid"
                                : ""
                            }
                            type="text"
                            name="nameSymptom"
                            placeholder="Nombre Sintoma"
                            onChange={this.handleChange}
                            defaultValue={sintoma.nameSymptom}
                            required
                            errorDiv={
                              this.hasError("nameSymptom")
                                ? "text-danger"
                                : "d-none"
                            }
                            errorMsg={"Please enter a title"}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionSymptom"
                            placeholder="Descripcion de sintoma"
                            onChange={this.handleChange}
                            defaultValue={sintoma.descriptionSymptom}
                            required
                          />
                        </Form.Group>

                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <br />
                          <button className="btn btn-primary ms-1">
                            Editar
                          </button>
                          <Link
                            to="/sintomas"
                            className="btn btn-warning ms-1 link2"
                          >
                            Cancelar
                          </Link>

                          <button className="btn btn-danger ms-1 button2">
                            {sintoma.id > 0 && (
                              <a
                                href="#!"
                                className="texta"
                                onClick={() => this.confirmDelete()}
                              >
                                Delete
                              </a>
                            )}
                          </button>
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
