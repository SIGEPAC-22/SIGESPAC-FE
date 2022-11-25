import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

import "./Historial.scss";

export default class Historial extends Component {
  state = {
    gethistorial: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    const url = `${process.env.REACT_APP_URL_GET_ALL_HISTORY}`;
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
          if (result === null) {
            result = [];
          }
          console.log(result)
          this.setState({
            gethistorial: result,
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
    const { gethistorial, isLoaded, error } = this.state;

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
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="historial">
            <div className="historial__title">
              <h2>Historial de pacientes</h2>
            </div>
            <br />
            <div class={"container"}>
              <div class={"row"}>
              </div>
            </div>
            <br />
            <div className={"container"}>
              <div className={"row"}>
                <div className={"col-lg-12"}>
                  <div className={"table-responsive"}>
                    <table
                      class={
                        "table table-striped table-bordered table-condensed"
                      }
                    >
                      <thead class={"text-center"}>
                        <tr>
                          <th className="text-light">Nombre</th>
                          <th className="text-light">Apellido</th>
                          <th className="text-light">Fecha de Ingreso</th>
                          <th className="text-light">Fecha de alta</th>
                          <th className="text-light">Fecha de baja</th>
                          <th className="text-light">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gethistorial.map((gt) => (
                          <tr>
                            <td className="text-light" key={gt.idPatient}>
                              {gt.firstName}
                            </td>
                            <td className="text-light" key={gt.idPatient}>
                              {gt.lastName} 
                            </td>
                            <td className="text-light" key={gt.idPatient}>
                              {gt.admissionDate}
                            </td>
                            <td className="text-light" key={gt.idPatient}>
                            {gt.highDate}
                            </td>
                            <td className="text-light" key={gt.idPatient}>
                            {gt.lowDate}
                            </td>
                            <td>
                              <div class={"text-center"}>
                                <div class={"btn-group"}>
                                  <Link
                                    className={"btn btn-secondary btnDetalle"}
                                    to={`/detailhistorial/${gt.idPatient}`}
                                  >
                                    {"Detalle"}
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
