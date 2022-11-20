import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { URL_ADD_PACIENTES } from "../../../utils/constant";
import swal from "sweetalert";
import Select from "react-select";
import "./AddPacientes.scss";
export default class AddPacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paciente: {
        firstName: "",
        secondName: "",
        lastFirstName: "",
        lastSecondName: "",
        dateBirth: "",
        documentType: "",
        documentNumber: "",
        cellPhoneNumber: "",
        phoneNumber: "",
        responsibleFamily: "",
        responsibleFamilyPhoneNumber: "",
        department: "",
        patientSex: "",
        pregnant: "",
        foreign: "",
      },
      isLoaded: false,
      typeDocument: [],
      department: [],
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

    const url = `${URL_ADD_PACIENTES}`;

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
                text: "Se agrego correctamente el registro de pacientes",
                icon: "success",
                timer: "2000",
                buttons: false,
              }).then(function () {
                window.location = "/pacientes";
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
                window.location = "/pacientes";
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
            window.location = "/pacientes";
          });
        });
      });
  };

  componentDidMount() {
    this.setState({
      paciente: {
        firstName: "",
        secondName: "",
        lastFirstName: "",
        lastSecondName: "",
        dateBirth: "",
        documentType: "",
        documentNumber: "",
        cellPhoneNumber: "",
        phoneNumber: "",
        responsibleFamily: "",
        responsibleFamilyPhoneNumber: "",
        department: "",
        patientSex: "",
        pregnant: "",
        foreign: "",
      },
      isLoaded: true,
    });
    fetch("http://localhost:90/v1/sgp-info-svc/getTypeDocument")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log(response)
        this.setState({ typeDocument: response });
      });
    ////////////////////////////////////////////////
    fetch("http://localhost:90/v1/sgp-info-svc/getDepartment")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ department: response });
      });
    //////////////////////////////////////////////////
    fetch("http://localhost:90/v1/sgp-info-svc/getSex")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ sex: response });
      });
  }

  handleCheckbox = (event) => {
    if (!event.target.checked) {
      this.setState({ event: "" });
    } else {
      this.setState({ event: "si" });
    }
    console.log(this.state.paciente.pregnant);
  };

  handleCheckboxForeign = (Foreign) => {
    if (!Foreign.target.checked) {
      this.setState({ Foreign: "" });
    } else {
      this.setState({ Foreign: "si" });
    }
    console.log(this.state.paciente.foreign);
  };

  handleChangeTypeDocument = (selectedOptionTypeDocument) => {
    this.setState({
      selectedOptionTypeDocument,
    });
  };

  handleChangeDepartment = (selectedOptionDepartment) => {
    this.setState({
      selectedOptionDepartment,
    });
  };
  handleChangeSex = (selectedOptionSex) => {
    this.setState({ selectedOptionSex });
  };

  render() {
    let { paciente, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="addpacientes">
            <div className="addpacientes__title">
              <h2>Agregar paciente</h2>
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
                            defaultValue={paciente.firstName}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="secondName"
                            placeholder="Segundo nombre"
                            onChange={""}
                            defaultValue={paciente.secondName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastFirstName"
                            placeholder="Primer apellido"
                            onChange={""}
                            defaultValue={paciente.lastFirstName}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastSecondName"
                            placeholder="Segundo apellido"
                            onChange={""}
                            defaultValue={paciente.lastSecondName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label className="labeld">Fecha de nacimiento</label>
                          <Form.Control
                            type="date"
                            name="dateBirth"
                            placeholder="Fecha de nacimiento"
                            onChange={""}
                            defaultValue={paciente.dateBirth}
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
                            defaultValue={paciente.documentNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="cellPhoneNumber"
                            placeholder="Número de celular"
                            onChange={""}
                            defaultValue={paciente.cellPhoneNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Número de teléfono"
                            onChange={""}
                            defaultValue={paciente.phoneNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamily"
                            placeholder="Nombre del familiar responsable"
                            onChange={""}
                            defaultValue={paciente.responsibleFamily}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamilyPhoneNumber"
                            placeholder="Número de telefono del familiar responsable"
                            onChange={""}
                            defaultValue={paciente.responsibleFamilyPhoneNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="department"
                            options={this.state.department.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameDepartment}`,
                              };
                            })}
                            placeholder="Seleccione departamento donde recide"
                            value={this.state.selectedOptionDepartment}
                            onChange={this.handleChangeDepartment}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="patientSex"
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
                          <label className="labeld">¿Eres extranjero?</label>
                          <input
                            type="checkbox"
                            onChange={this.handleCheckboxForeign}
                            name="foreign"
                            value={this.state.Foreign}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label className="labeld">¿Estas Embarazada?</label>
                          <input
                            type="checkbox"
                            onChange={this.handleCheckbox}
                            name="pregnant"
                            value={this.state.event}
                          />
                        </Form.Group>
                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr />
                          <button className="btn btn-primary">Registrar</button>
                          <Link
                            to="/pacientes"
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
