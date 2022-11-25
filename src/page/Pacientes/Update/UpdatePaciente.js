import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import 'react-confirm-alert/src/react-confirm-alert.css'
import swal from 'sweetalert';
import Select from "react-select";
import "./UpdatePaciente.scss";

export default class UpdatePaciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paciente: {
        id: 0,
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
      },
      isLoaded: false,
      typeDocument: [],
      department: [],
      sex: [],
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
    if (this.state.paciente.firstName === "") {
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

    const url = `${process.env.REACT_APP_URL_UPDATE_PATIENT}?id=${id}`;

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
            window.location="/pacientes"
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

  //si no se usa borrar
  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      paciente: {
        ...prevState.paciente,
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

    const url = `${process.env.REACT_APP_URL_GET_ONE_PATIENT}?id=${id}`;

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
              paciente: {
                id: id,
                firstName: result.firstName,
                secondName: result.secondName,
                lastFirstName: result.lastName,
                lastSecondName: result.motherLastName,
                dateBirth: result.dateBirth,
                documentType: result.documentType,
                documentNumber: result.documentNumber,
                cellPhoneNumber: result.cellphoneNumber,
                phoneNumber: result.phoneNumber,
                responsibleFamily: result.responsibleFamily,
                responsibleFamilyPhoneNumber: result.responsibleFamilyPhoneNumber,
                department: result.department,
                patientSex: result.patientSex,
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
    fetch(process.env.REACT_APP_URL_GET_ALL_PATIENT_DOCUMENT_TYPE)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log(response)
        this.setState({ typeDocument: response });
      });
    ////////////////////////////////////////////////
    fetch(process.env.REACT_APP_URL_GET_ALL_PATIENT_DEPARTMENT)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ department: response });
      });
    //////////////////////////////////////////////////
    fetch(process.env.REACT_APP_URL_GET_ALL_PATIENT_SEX)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ sex: response });
      });
  }

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

  render() {
    let { paciente, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="updatepaciente">
            <div className="updatepaciente__title">
              <h2>Editar Paciente</h2>
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
                            defaultValue={paciente.id}
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
                            defaultValue={paciente.firstName}
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
                            defaultValue={paciente.secondName}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastFirstName"
                            placeholder="Primer apellido"
                            onChange={this.handleChange}
                            defaultValue={paciente.lastFirstName}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="lastSecondName"
                            placeholder="Segundo apellido"
                            onChange={this.handleChange}
                            defaultValue={paciente.lastSecondName}
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
                            defaultValue={{label: paciente.documentType}}
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
                            defaultValue={paciente.documentNumber}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="cellPhoneNumber"
                            placeholder="Número de celular"
                            onChange={this.handleChange}
                            defaultValue={paciente.cellPhoneNumber}
                          />
                          </Form.Group>

                          <Form.Group>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Número de teléfono"
                            onChange={this.handleChange}
                            defaultValue={paciente.phoneNumber}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamily"
                            placeholder="Nombre del familiar responsable"
                            onChange={this.handleChange}
                            defaultValue={paciente.responsibleFamily}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamilyPhoneNumber"
                            placeholder="Número de telefono del familiar responsable"
                            onChange={this.handleChange}
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
                            //value={this.state.selectedOptionDepartment}
                            defaultValue={{label: paciente.department}}
                            onChange={this.handleChangeDepartment}
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
