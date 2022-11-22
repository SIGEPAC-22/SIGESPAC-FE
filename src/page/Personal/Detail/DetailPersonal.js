import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { URL_GET_ONE_PERSONAL } from "../../../utils/constant";
import "./DetailPersonal.scss";

export default class DetailPersonal extends Component {
  state = {
    getOnePersonal: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${URL_GET_ONE_PERSONAL}?id=${id}`;

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
            getOnePersonal: result,
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
    const { getOnePersonal, isLoaded, error } = this.state;
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
              <h2>Detalle de {getOnePersonal.firstName} {getOnePersonal.lastName}</h2>
            </div>
            <>
              <div className="float-start text-light">
                <h4>DUI: {getOnePersonal.documentNumber}</h4>
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
                      {getOnePersonal.firstName} {getOnePersonal.secondName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Apellidos:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.lastName} {getOnePersonal.secondLastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Sexo:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.sex}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Fecha de Nacimiento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Tipo de documento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.typeDocument}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Numero de documento:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.documentNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre de Usuario:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.user}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Tipo de Usuario:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.typeUser}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                     Fecha de creacion del usuario:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.dateCreationAccount}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Estado del usuario:
                    </td>
                    <td className="text-light fs-5">
                      {getOnePersonal.stateName}
                    </td>
                  </tr>
                  <Link className="atras btn btn-primary" to={`/personal`}> Atrás</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
