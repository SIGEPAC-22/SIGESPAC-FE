import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import "./DetailComorbilidad.scss";

export default class DetailComorbilida extends Component {
  state = {
    getOneComorbilidad: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin

    const url = `${process.env.REACT_APP_URL_GET_ONE_COMORBIDITY}?id=${id}`;

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
            getOneComorbilidad: result,
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
    const { getOneComorbilidad, isLoaded, error } = this.state;
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
          <BasicLayout className="detailcomorbilidad">
            <div className="detailcomorbilidad__title">
              <h2>Detalle de {getOneComorbilidad.nameComorbidity}</h2>
            </div>
            <>
              <div className="float-start text-light">
                <h4>id: {getOneComorbilidad.id}</h4>
              </div>
              <br></br>
              <hr></hr>
              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Nombre comorbilidad:
                    </td>
                    <td className="text-light fs-5">
                      {getOneComorbilidad.nameComorbidity}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-light fs-5">
                      Descripcion comorbilidad
                    </td>
                    <td className="text-light fs-5">
                      {getOneComorbilidad.descriptionComorbidity}
                    </td>
                  </tr>
                  <Link className="atras btn btn-primary" to={`/comorbilidad`}> Atr??s</Link>
                </tbody>
              </table>
            </>
          </BasicLayout>
        </Fragment>
      );
    }
  }
}
