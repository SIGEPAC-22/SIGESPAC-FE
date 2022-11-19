import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import { URL_GET_ALL_PACIENTES } from "../../utils/constant";

import "./Pacientes.scss";

export default class Pacientes extends Component {
  state = {
    getPacientes: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    const url = `${URL_GET_ALL_PACIENTES}`;
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
          this.setState({
            getPacientes: result,
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
    const { getPacientes, isLoaded, error } = this.state;

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
          <BasicLayout className="pacientes">
            <div className="pacientes__title">
              <h2>Pacientes</h2>
            </div>
            <br />
            <div class={"container"}>
              <div class={"row"}>
                <div class={"col-lg-12"}>
                  <Link className={"btn btn-success"} to={`/addpaciente`}>
                    {"Agregar"}
                  </Link>
                </div>
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
                          <th className="text-light">Nombres</th>
                          <th className="text-light">Apellidos</th>
                          <th className="text-light">Fecha de Nacimiento</th>
                          <th className="text-light">Nº Documento</th>
                          <th className="text-light">Nº Celular</th>
                          <th className="text-light">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPacientes.map((gt) => (
                          <tr>
                            <td className="text-light" key={gt.id}>
                              {gt.firstName} {gt.secondName}
                            </td>
                            <td className="text-light" key={gt.id}>
                              {gt.lastName} {gt.motherLastName}
                            </td>
                            <td className="text-light" key={gt.id}>
                              {gt.dateBirth}
                            </td>
                            <td className="text-light" key={gt.id}>
                              {gt.documentNumber}
                            </td>
                            <td className="text-light" key={gt.id}>
                              {gt.cellphoneNumber}
                            </td>
                            <td>
                              <div class={"text-center"}>
                                <div class={"btn-group"}>
                                  <Link
                                    className={"btn btn-primary btnEditar"}
                                    to={`/update/${gt.id}`}
                                  >
                                    {"Editar"}
                                  </Link>
                                  <Link
                                    className={"btn btn-secondary btnDetalle"}
                                    to={`/detailpaciente/${gt.id}`}
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
