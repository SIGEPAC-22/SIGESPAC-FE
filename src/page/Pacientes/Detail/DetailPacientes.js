import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import "./DetailPacientes.scss";

export default class DetailPacientes extends Component {
  state = {
    getOnePaciente: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${process.env.REACT_APP_URL_GET_ONE_PATIENT}?id=${id}`;

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
            getOnePaciente: result,
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
    const { getOnePaciente, isLoaded, error } = this.state;
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
          <BasicLayout className="detailpacientes">
            <div className="detailpacientes__title">
              <h2>Detalle de {getOnePaciente.firstName} {getOnePaciente.lastName}</h2>
            </div>
            <>
              <div className="float-start text-light">
                <h4>DUI: {getOnePaciente.documentNumber}</h4>
              </div>
              <br></br>
              <hr></hr>
              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre :
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.firstName} {getOnePaciente.secondName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Apellidos:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.lastName} {getOnePaciente.motherLastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Sexo:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.patientSex}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Fecha de Nacimiento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.dateBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Tipo de documento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.documentType}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Numero de documento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.documentNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Numero de celular:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.cellphoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Numero de telefono:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                     Familiar responsable:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.responsibleFamily}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Numero de telefono de responsable:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.responsibleFamilyPhoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Departamento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.department}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Pais:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePaciente.country}
                    </td>
                  </tr>
                  <Link className="atras btn btn-primary" to={`/pacientes`}> Atrás</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
