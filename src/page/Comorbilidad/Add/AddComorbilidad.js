import React, { Component, Fragment } from "react";
import { Link, withRouter} from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import {URL_ADD_COMORBILIDAD} from "../../../utils/constant"

import "./AddComorbilidad.scss";
export default class AddComorbilidad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comorbilidad: {
        nameComorbidity: "",
        descriptionComorbidity: "",
      },
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    const url = `${URL_ADD_COMORBILIDAD}`;

    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(url,params)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            alert: { type: "alert-danger", message: data.error.message },
          });
        } else {
          this.setState({
            alert: { type: "alert-success", message: "Changes saved!" },
          });
        }
      });
  };

  componentDidMount() {
    this.setState({
      comorbilidad: {
        nameComorbidity: "",
        descriptionComorbidity: "",
      },
      isLoaded: true,
    });
  }

  render() {

    let { comorbilidad, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="addcomorbilidad">
            <div className="addcomorbilidad__title">
              <h2>Agregar Comorbilidad</h2>
            </div>
            <>
              <div className="container col-md-7">
                <br />
                <div className="card-header">
                  <div className="card-body shadow-lg p-3">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="nameComorbidity"
                            placeholder="nombre comorbilidad"
                            onChange={""}
                            defaultValue={comorbilidad.nameComorbidity}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionComorbidity"
                            placeholder="Descripcion comorbilidad"
                            onChange={""}
                            defaultValue={comorbilidad.descriptionComorbidity}
                          />
                        </Form.Group>
                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <hr />
                          <button className="btn btn-primary">Registrar</button>
                          <Link
                            to="/comorbilidad"
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