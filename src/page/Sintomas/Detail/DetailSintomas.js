import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { URL_GET_ONE_SINTOMAS } from "../../../utils/constant";
import "./DetailSintomas.scss";

export default class DetailSintomas extends Component {
  state = {
    getOneSintoma: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${URL_GET_ONE_SINTOMAS}?id=${id}`;

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
            getOneSintoma: result,
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
    const { getOneSintoma, isLoaded, error } = this.state;
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
          <BasicLayout className="detailsintomas">
            <div className="detailsintomas__title">
              <h2>Detalle de {getOneSintoma.nameSymptom}</h2>
            </div>
            <>
              <div className="float-start text-light">
                <h4>id: {getOneSintoma.id}</h4>
              </div>
              <br></br>
              <hr></hr>
              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre Sintoma:
                    </td>
                    <td className="text-light fs-5">
                      {getOneSintoma.nameSymptom}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Descripcion Sintoma
                    </td>
                    <td className="text-light fs-5">
                      {getOneSintoma.descriptionSymptom}
                    </td>
                  </tr>
                  <Link className="atras btn btn-primary" to={`/sintomas`}> Atrás</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
