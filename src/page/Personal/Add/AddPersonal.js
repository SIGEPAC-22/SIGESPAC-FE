import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { URL_ADD_PERSONAL } from "../../../utils/constant";
import swal from "sweetalert";
import Select from "react-select";
import "./AddPersonal.scss";
export default class AddPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: {
        firstName: "",
        secondName: "",
        firstLastName: "",
        secondLastName: "",
        sex: "",
        dateBirth: "",
        documentType: "",
        documentNumber: "",
        user: "",
        password:"",
        typeUser:"",
      },
      isLoaded: false,
      typeDocument: [],
      typeUser:[],
      sex: [],
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

    const url = `${URL_ADD_PERSONAL}`;

    const params = {
      method: "POST",
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
          this.cancel();
          if (data.responseCode === 200) {
            this.setState(() => {
              swal({
                title: "Exito al Guardar",
                text: "Se agrego correctamente el registro de personal",
                icon: "success",
                timer: "2000",
                buttons: false,
              }).then(function () {
                window.location = "/personal";
              });
            });
          } else {
            this.setState(() => {
              swal({
                title: "Error al Guardar",
                text: "Error el registro no se realizo con exito, intentelo, nuevamente",
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

  componentDidMount() {
    this.setState({
      personal: {
        firstName: "",
        secondName: "",
        firstLastName: "",
        secondLastName: "",
        sex: "",
        dateBirth: "",
        documentType: "",
        documentNumber: "",
        user: "",
        password:"",
        typeUser:"",
      },
      isLoaded: true,
    });
    fetch("http://localhost:93/v1/sgp-access-info-svc/getDocumentType")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log(response)
        this.setState({ typeDocument: response });
      });
    ////////////////////////////////////////////////
    fetch("http://localhost:93/v1/sgp-access-info-svc/getPersonalSex")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ sex: response });
      });
      ////////////////////////////////////////////////
    fetch("http://localhost:93/v1/sgp-access-info-svc/getTypeUser")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({ typeUser: response });
    });
  }



  handleChangeTypeDocument = (selectedOptionTypeDocument) => {
    this.setState({
      selectedOptionTypeDocument,
    });
  };

  handleChangeSex = (selectedOptionSex) => {
    this.setState({ selectedOptionSex });
  };

  handleChangetypeUser = (selectedOptiontypeUser) => {
    this.setState({ selectedOptiontypeUser });
  };

  render() {
    let { personal, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="addpersonal">
            <div className="addpersonal__title">
              <h2>Agregar personal</h2>
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
                            name="firstName"
                            placeholder="Primer nombre"
                            onChange={""}
                            defaultValue={personal.firstName}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="secondName"
                            placeholder="Segundo nombre"
                            onChange={""}
                            defaultValue={personal.secondName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="firstLastName"
                            placeholder="Primer apellido"
                            onChange={""}
                            defaultValue={personal.firstLastName}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="secondLastName"
                            placeholder="Segundo apellido"
                            onChange={""}
                            defaultValue={personal.secondLastName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="sex"
                            options={this.state.sex.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameSex}`,
                              };
                            })}
                            placeholder="Seleccioné su sexo"
                            value={this.state.selectedOptionSex}
                            onChange={this.handleChangeSex}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <label className="labeld">Fecha de nacimiento</label>
                          <Form.Control
                            type="date"
                            name="dateBirth"
                            placeholder="Fecha de nacimiento"
                            onChange={""}
                            defaultValue={personal.dateBirth}
                            required
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
                            value={this.state.selectedOptionTypeDocument}
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
                            onChange={""}
                            defaultValue={personal.documentNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="user"
                            placeholder="Nombre de usuario"
                            onChange={""}
                            defaultValue={personal.user}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="password"
                            name="Password"
                            placeholder="Contraseña"
                            onChange={""}
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
                            placeholder="Tipo de usuario"
                            value={this.state.selectedOptiontypeUser}
                            onChange={this.handleChangetypeUser}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>
                       
                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr />
                          <button className="btn btn-primary">Registrar</button>
                          <Link
                            to="/personal"
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
