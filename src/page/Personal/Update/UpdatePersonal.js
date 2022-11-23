import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import swal from 'sweetalert';
import Select from "react-select";
import {
  URL_UPDATE_PERSONAL ,
  URL_GET_ONE_PERSONAL,
  URL_DELETE_PERSONAL,
  URL_GET_ALL_DOCUMENTETYPE,
  URL_GET_ALL_TYPEUSER,
} from "../../../utils/constant";
import "./UpdatePersonal.scss";

export default class UpdatePersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: {
        id: 0,
        firstName: "",
        secondName: "",
        firstLastName: "",
        secondLastName: "",
        documentType: "",
        documentNumber: "",
        user: "",
        password:"",
        typeUser:"",
      },
      isLoaded: false,
      typeDocument: [],
      typeUser: [],
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
    if (this.state.personal.firstName === "") {
      errors.push("firstName");
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

    const url = `${URL_UPDATE_PERSONAL}?id=${id}`;

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
          this.setState(()=>{
            swal({
              title: "Exito al Actualizar",
              text: "Se actualizó correctamente el registro",
              icon:"success",
              timer: "2000",
              buttons: false,
          }).then(function(){
            window.location="/personal"
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
              window.location = "/personal";
            });
          });
        }
        }
      })
      .catch((error) => {
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
            window.location = "/personal";
          });
        });
      });
  };

  //si no se usa borrar
  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      personal: {
        ...prevState.personal,
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

    const url = `${URL_GET_ONE_PERSONAL}?id=${id}`;

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
            console.log(result)
          this.setState(
            {
              personal: {
                id: id,
                firstName: result.firstName,
                secondName: result.secondName,
                firstLastName: result.lastName,
                secondLastName: result.secondLastName,
                documentType: result.typeDocument,
                documentNumber: result.documentNumber,
                user: result.user,
                password: result.password,
                typeUser: result.typeUser,
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
    fetch(URL_GET_ALL_DOCUMENTETYPE)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log(response)
        this.setState({ typeDocument: response });
      });
    ////////////////////////////////////////////////
    fetch(URL_GET_ALL_TYPEUSER)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ typeUser: response });
      });
    //////////////////////////////////////////////////
    
  }


  handleChangeTypeDocument = (selectedOptionTypeDocument) => {
    this.setState({
      selectedOptionTypeDocument,
    });
  };

  handleChangetypeUser = (selectedOptiontypeUser) => {
    this.setState({
      selectedOptiontypeUser,
    });
  };

  confirmDelete = () => {
    const url = `${URL_DELETE_PERSONAL}?id=${this.state.personal.id}`;

    const params = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    confirmAlert({
      title: "Eliminar el registro",
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
                }
                window.location = "/personal";
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
    let { personal, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="updatepersonal">
            <div className="updatepersonal__title">
              <h2>Editar Personal</h2>
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
                            defaultValue={personal.id}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            className={
                              this.hasError("firstName")
                                ? "is-invalid"
                                : ""
                            }
                            type="text"
                            name="firstName"
                            placeholder="Primer nombre"
                            onChange={this.handleChange}
                            defaultValue={personal.firstName}
                            required
                            errorDiv={
                              this.hasError("firstName")
                                ? "text-danger"
                                : "d-none"
                            }
                            errorMsg={"Please enter a title"}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="secondName"
                            placeholder="Segundo nombre"
                            onChange={this.handleChange}
                            defaultValue={personal.secondName}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastFirstName"
                            placeholder="Primer apellido"
                            onChange={this.handleChange}
                            defaultValue={personal.firstLastName}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastSecondName"
                            placeholder="Segundo apellido"
                            onChange={this.handleChange}
                            defaultValue={personal.secondLastName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="documentType"
                            options={this.state.typeDocument.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameTypeDocument}`,
                              };
                            })}
                            placeholder="Tipo de documento"
                            //value={this.state.selectedOptionTypeDocument}
                            defaultValue={{label: personal.documentType}}
                            onChange={this.handleChangeTypeDocument}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="documentNumber"
                            placeholder="Número de documento"
                            onChange={this.handleChange}
                            defaultValue={personal.documentNumber}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="user"
                            placeholder="Nombre de usuario"
                            onChange={this.handleChange}
                            defaultValue={personal.user}
                          />
                          </Form.Group>

                          <Form.Group>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={this.handleChange}
                            defaultValue={personal.password}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="typeUser"
                            options={this.state.typeUser.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameType}`,
                              };
                            })}
                            placeholder="Seleccione departamento donde recide"
                            defaultValue={{label: personal.typeUser}}
                            onChange={this.handleChangetypeUser}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>

                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <br />
                          <button className="btn btn-primary ms-1">
                            Editar
                          </button>
                          <Link
                            to="/personal"
                            className="btn btn-warning ms-1 link2"
                          >
                            Cancelar
                          </Link>

                          <Link className="btn btn-danger ms-1 button2">
                            {personal.id > 0 && (
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
