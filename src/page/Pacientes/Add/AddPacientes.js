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
        pregnant: false,
      },
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckbox = event =>{
    let state = this.state;
    state.paciente[event.target.value] = event.target.checked;
    this.setState(state);
    console.log(this.state.paciente);
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
          this.setState(() => {
            swal({
              title: "Exito al Guardar",
              text: "Se agrego correctamente el registro de comorbilidad",
              icon: "success",
              timer: "2000",
              buttons: false,
            }).then(function () {
              window.location = "/comorbilidad";
            });
          });
        }
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
        pregnant: false,
      },
      isLoaded: true,
    });
  }
  
  
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
                            required
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
                            defaultValue={paciente.dateBirth}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="documentType"
                            Options={"sadsad"}
                            placeholder="Tipo de documento"
                            onChange={""}
                            defaultValue={""}
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
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="cellPhoneNumber"
                            placeholder="Número de celular"
                            onChange={""}
                            defaultValue={paciente.cellPhoneNumber}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Número de teléfono"
                            onChange={""}
                            defaultValue={paciente.phoneNumber}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamily"
                            placeholder="Nombre del familiar responsable"
                            onChange={""}
                            defaultValue={paciente.responsibleFamily}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="responsibleFamilyPhoneNumber"
                            placeholder="Número de telefono del familiar responsable"
                            onChange={""}
                            defaultValue={paciente.responsibleFamilyPhoneNumber}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="department"
                            Options={"sadsad"}
                            placeholder="Seleccioné su departamento"
                            onChange={""}
                            defaultValue={""}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Select
                            className="Selectd"
                            name="patientSex"
                            Options={"sadsad"}
                            placeholder="Seleccioné su sexo"
                            onChange={""}
                            defaultValue={""}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <label className="labeld">¿Estas Embarazada?</label>
                        <input type="checkbox" onChange={this.handleCheckbox} name="paciente" value="pregnant" checked={this.state.paciente.pregnant}/>
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
