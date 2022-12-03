import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

import "./Expediente.scss";

export default class Expediente extends Component {
  state = {
    getExpediente: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    const url = `${process.env.REACT_APP_URL_GET_ALL_PATIENT_FILE}`;
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
            getExpediente: result,
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
    const { getExpediente, isLoaded, error } = this.state;
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
          <BasicLayout className="expediente">
            <div className="expediente__title">
              <h2>Expediente</h2>
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
                          <th className="text-light">Nombre completo</th>
                          <th className="text-light">Tipo de documento</th>
                          <th className="text-light">Nº Documento</th>
                          <th className="text-light">Fecha de ingreso</th>
                          <th className="text-light">Fecha de Alta</th>
                          <th className="text-light">Fecha de baja</th>
                          <th className="text-light">Comorbilidades</th>
                          <th className="text-light">Sintomas</th>
                          <th className="text-light">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getExpediente.map((gt) => (
                          <tr>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.fullName}
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.documentType} 
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.documentNumber}
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.admissionDate}
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.highDate}
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                              {gt.lowDate}
                            </td>
                            <td className="text-light" key={gt.idPatientFile}>
                            {gt.comorbidity.join(', \n')}
                            </td>
                          
                            <td className="text-light" key={gt.idPatientFile}>
                            {gt.symptom.join(', \n')}
                              <br/>
                            </td> 
                            <td>
                              <div class={"text-center"}>
                                <div class={"btn-group"}>
                                  <Link
                                    className={"btn btn-primary btnEditar"}
                                    to={`/updateexpediente/${gt.idPatientFile}`}
                                  >
                                    {"Editar"}
                                  </Link>
                                  <Link
                                    className={"btn btn-secondary btnDetalle"}
                                    to={`/detailexpediente/${gt.idPatientFile}`}
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
