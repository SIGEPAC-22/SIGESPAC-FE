import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import "./DetailExpediente.scss";

export default class DetailExpediente extends Component {
  state = {
    getOneExpediente: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${process.env.REACT_APP_URL_GET_ONE_PATIENT_FILE}?id=${id}`;

    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(url, params)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            getOneExpediente: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { getOneExpediente, isLoaded, error } = this.state;
    if (error) {
      return (
        <div>
          Error:{" "}
          {"The get request was not successful" +
            ", " +
            "error: " +
            error.message}
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading</div>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="detailexpediente">
            <div className="detailexpediente__title">
              <h2>Detalle de {getOneExpediente.fullName}</h2>
            </div>
            <>
              <div className="float-start text-light">
              <h4>ID Paciente: {getOneExpediente.idPatient}</h4>
                <h4>ID Expediente: {getOneExpediente.idPatientFile}</h4>
              </div>
              <br></br>
              <br/>
              <br/>
              <hr></hr>
              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre completo:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Tipo de documento:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.documentType}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Número de documento :
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.documentNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Número de celular:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.cellphoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Familiar responsable:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.responsibleFamily}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Numero del responsable:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.responsibleFamilyPhoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Sexo:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.sex}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Embarazo:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.pregnant}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Estado del paciente:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.statePatient}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                     Fecha de Admisión:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.admissionDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Fecha de alta:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.highDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Fecha de baja:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.lowDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Comorbilidades:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.comorbidity.join(', \n')}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Sintomas:
                    </td>
                    <td className="text-light fs-5">
                      {getOneExpediente.symptom.join(', \n')}
                    </td>
                  </tr>
                  <Link className="atras btn btn-primary" to={`/expediente`}> Atrás</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
