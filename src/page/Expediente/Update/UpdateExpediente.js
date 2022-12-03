import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import 'react-confirm-alert/src/react-confirm-alert.css'
import swal from 'sweetalert';
import Select from "react-select";
import "./UpdateExpediente.scss";

export default class UpdateExpediente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expediente: {
        idPatient: 0,
        idPatientFile:0,
        fullName: "",
        cellPhoneNumber: "",
        responsibleFamily: "",
        responsibleFamilyPhoneNumber: "",
        sex:"",
        pregnant:"",
        admissionDate:"",
        statePatient:"",
        highDate:"",
        lowDate:"",
        comorbidity:[],
        symptom:[]
      },
      isLoaded: false,
      sex:[],
      statePatient: [],
      comorbidity:[],
        symptom:[],
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
    if (this.state.expediente.fullName === "") {
      errors.push("fullName");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
      console.log(payload)
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${process.env.REACT_APP_URL_UPDATE_PATIENT_FILE}?idPatient=${id}&idPatientFile=${id}`;

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
            window.location="/expediente"
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
              window.location = "/expediente";
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
            window.location = "/expediente";
          });
        });
      });
  };

  //si no se usa borrar
  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      expediente: {
        ...prevState.expediente,
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

    const url = `${process.env.REACT_APP_URL_GET_ONE_PATIENT_FILE}?id=${id}`;
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
              expediente: {
                idPatient: result.idPatient,
                idPatientFile:result.idPatientFile,
                fullName: result.fullName,
                cellPhoneNumber: result.cellphoneNumber,
                responsibleFamily: result.responsibleFamily,
                responsibleFamilyPhoneNumber: result.responsibleFamilyPhoneNumber,
                sex: result.sex,
                pregnant:result.pregnant,
                admissionDate:result.admissionDate,
                statePatient: result.statePatient,
                patientSex: result.patientSex,
                highDate: result.highDate,
                lowDate: result.lowDate,
                comorbidity:[result.comorbidity],
                symptom:[result.symptom],
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
       ////////////////////////////////////////////////
    fetch(process.env.REACT_APP_URL_GET_ALL_PATIENT_SEX)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({ sex: response });
    });
      
    ////////////////////////////////////////////////
    fetch(process.env.REACT_APP_URL_GET_ALL_STATE_PATIENT)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ statePatient: response });
      });
    //////////////////////////////////////////////////
    
    fetch(process.env.REACT_APP_URL_GET_ALL_COMORBIDITY)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ comorbidity: response });
      });
      
      //////////////////////////////////////////////////
    fetch(process.env.REACT_APP_URL_GET_ALL_SYMPTOMS)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({ symptom: response });
    });
  }

  handleChangeSex = (selectedOptionSex) => {
    this.setState({
      selectedOptionSex,
    });
  };

  handleChangeStatePatient = (selectedOptionStatePatient) => {
    this.setState({
      selectedOptionStatePatient,
    });
  };

  handleChangeComorbidity = (selectedOptionComorbidity) => {
    this.setState({
      selectedOptionComorbidity,

    });
    console.log(selectedOptionComorbidity)
  };

  handleChangeSymptom = (selectedOptionSymptom) => {
    this.setState({
      selectedOptionSymptom,
    });
  };

 

  render() {
    let { expediente, isLoaded, error } = this.state;
    console.log(expediente.comorbidity[0])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="updateexpediente">
            <div className="updateexpediente__title">
              <h2>Editar Expediente</h2>
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
                            name="idPatient"
                            onChange={this.handleChange}
                            defaultValue={expediente.idPatient}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="hidden"
                            name="idPatientFile"
                            onChange={this.handleChange}
                            defaultValue={expediente.idPatientFile}
                          />
                        </Form.Group>

                        <Form.Group>
                        <label className="labeld">Nombre completo</label>
                          <Form.Control
                            className={
                              this.hasError("fullName") ? "is-invalid" : ""
                            }
                            disabled="true"
                            type="text"
                            name="fullName"
                            placeholder="Nombre completo"
                            onChange={this.handleChange}
                            defaultValue={expediente.fullName}
                            required
                            errorDiv={
                              this.hasError("fullName")
                                ? "text-danger"
                                : "d-none"
                            }
                            errorMsg={"Please enter a title"}
                          />
                        </Form.Group>

                        <Form.Group>
                        <label className="labeld">Número de celular</label>
                          <Form.Control
                            disabled="true"
                            type="text"
                            name="cellPhoneNumber"
                            placeholder="Número de celular"
                            onChange={this.handleChange}
                            defaultValue={expediente.cellPhoneNumber}
                          />
                        </Form.Group>

                        <Form.Group>
                        <label className="labeld">Nombre del familiar responsable</label>
                          <Form.Control
                            disabled="true"
                            type="text"
                            name="responsibleFamily"
                            placeholder="Nombre del familiar responsable"
                            onChange={this.handleChange}
                            defaultValue={expediente.responsibleFamily}
                          />
                        </Form.Group>

                        <Form.Group>
                        <label className="labeld">Número de telefono del familiar responsable</label>
                          <Form.Control
                            disabled="true"
                            type="text"
                            name="responsibleFamilyPhoneNumber"
                            placeholder="Número de telefono del familiar responsable"
                            onChange={this.handleChange}
                            defaultValue={
                              expediente.responsibleFamilyPhoneNumber
                            }
                          />
                          </Form.Group>
                          <Form.Group>
                          <label className="labeld">Sexo del paciente</label>
                            <Select
                              isDisabled="true"
                              className="Selectd"
                              name="sex"
                              options={this.state.sex.map(
                                (elemento) => {
                                  return {
                                    value: `${elemento.id}`,
                                    label: `${elemento.nameSex}`,
                                  };
                                }
                              )}
                              placeholder="seleccione sexo"
                              //value={this.state.selectedOptionTypeDocument}
                              defaultValue={{ label: expediente.sex }}
                              onChange={this.handleChangeSex}
                              closeMenuOnSelect={true}
                              required
                            />
                          </Form.Group>
                        
                        <Form.Group>
                        <label className="labeld">Estado de Embarazo</label>
                          <Form.Control
                           disabled="true"
                            type="text"
                            name="pregnant"
                            placeholder="Embarazo"
                            onChange={this.handleChange}
                            defaultValue={expediente.pregnant}
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Fecha de admisión</label>
                          <Form.Control
                           disabled="true"
                            type="text"
                            name="admissionDate"
                            placeholder="Fecha de admisión"
                            onChange={this.handleChange}
                            defaultValue={expediente.admissionDate}
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Estado del paciente</label>
                          <Select
                            className="Selectd"
                            name="statePatient"
                            options={this.state.statePatient.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameStatePatient}`,
                              };
                            })}
                            placeholder="Estado del paciente"
                            //value={this.state.selectedOptionTypeDocument}
                            defaultValue={{ label: expediente.statePatient }}
                            onChange={this.handleChangeStatePatient}
                            closeMenuOnSelect={true}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Fecha de alta</label>
                          <Form.Control
                            type="date"
                            name="highDate"
                            placeholder="Fecha de alta"
                            onChange={this.handleChange}
                            defaultValue={expediente.highDate}
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Fecha de baja</label>
                          <Form.Control
                            type="date"
                            name="lowDate"
                            placeholder="Fecha de baja"
                            onChange={this.handleChange}
                            defaultValue={expediente.lowDate}
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Comorbilidades</label>
                          <Select
                            className="Selectd"
                            name="comorbidity"
                            options={this.state.comorbidity.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.nameComorbidity}`,
                              };
                            })}
                            isMulti
                            placeholder="Comorbilidades"
                            defaultValue={expediente.comorbidity.map(function(elemento, indice){
                              return{
                              label:`${elemento[indice]}`,
                              };
                            })}
                            onChange={this.handleChangeComorbidity}
                            closeMenuOnSelect={true}
                          />
                        </Form.Group>
                        <Form.Group>
                        <label className="labeld">Sintomas</label>
                          <Select
                            className="Selectd"
                            name="symptom"
                            options={this.state.symptom.map((elemento) => {
                              return {
                                value: `${elemento.id}`,
                                label: `${elemento.name_symptom}`,
                              };
                            })}
                            isMulti
                            placeholder="Sintomas"
                            //value={this.state.selectedOptionTypeDocument}
                            defaultValue={{ label: expediente.symptom }}
                            onChange={this.handleChangeSymptom}
                            closeMenuOnSelect={true}
                          />
                        </Form.Group>

                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <br />
                          <button className="btn btn-primary ms-1">
                            Editar
                          </button>
                          <Link
                            to="/expediente"
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
