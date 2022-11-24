import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { URL_GET_ONE_HISTORY } from "../../../utils/constant";
import "./DetailHistorial.scss";

export default class DetailHistorial extends Component {
  state = {
    getOneHistorial: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${URL_GET_ONE_HISTORY}?id=${id}`;

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
            getOneHistorial: result,
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
    const { getOneHistorial, isLoaded, error } = this.state;
    console.log(getOneHistorial)
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
          <BasicLayout className="detailhistorial">
            <div className="detailhistorial__title">
              <h2>Detalle de {getOneHistorial.firstName} {getOneHistorial.lastName}</h2>
            </div>
            <>
              <div className="float-start text-light">
                <h4>ID : {getOneHistorial.idPatient}</h4>
              </div>
              <br></br>
              <hr></hr>
              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre:
                    </td>
                    <td className="text-light fs-5">
                      {getOneHistorial.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Apellido:
                    </td>
                    <td className="text-light fs-5">
                      {getOneHistorial.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Fecha de Ingreso:
                    </td>
                    <td className="text-light fs-5">
                      {getOneHistorial.admissionDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Fecha de alta:
                    </td>
                    <td className="text-light fs-5">
                      {getOneHistorial.highDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                    Fecha de baja:
                    </td>
                    <td className="text-light fs-5">
                      {getOneHistorial.lowDate}
                    </td>
                  </tr>

                  <Link className="atras btn btn-primary" to={`/historial`}> Atrás</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
