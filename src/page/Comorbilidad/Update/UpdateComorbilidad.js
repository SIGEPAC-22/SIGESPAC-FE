import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import { Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import {
  URL_UPDATE_COMORBILIDAD,
  URL_GET_ONE_COMORBILIDAD,
  URL_DELETE_COMORBILIDAD,
} from "../../../utils/constant";

import "./UpdateComorbilidad.scss";
export default class UpdateComorbilidad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comorbilidad: {
        id: 0,
        nameComorbidity: "",
        descriptionComorbidity: "",
      },
      isLoaded: false,
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    let errors = [];
    if (this.state.comorbilidad.nameComorbidity === "") {
      errors.push("nameComorbidity");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${URL_UPDATE_COMORBILIDAD}?id=${id}`;

    const params = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(url, params)
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

  //si no se usa borrar
  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      comorbilidad: {
        ...prevState.comorbilidad,
        [name]: value,
      },
    }));
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount() {
    let urlNav = window.location.href;
    let saludoArray = urlNav.split("/");
    let urlNavOrigin = saludoArray[saludoArray.length - 1];
    var id = 0;
    id = urlNavOrigin;

    const url = `${URL_GET_ONE_COMORBILIDAD}?id=${id}`;

    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (id > 0) {
      fetch(url, params)
        .then((response) => {
          if (response.status !== "200") {
            let err = Error;
            err.Message = "Invalid response code: " + response.status;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then((result) => {
          this.setState(
            {
              comorbilidad: {
                id: id,
                nameComorbidity: result.nameComorbidity,
                descriptionComorbidity: result.descriptionComorbidity,
              },
              isLoaded: true,
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
        });
    } else {
      this.setState({ isLoaded: true });
    }
  }

  confirmDelete = (e) => {

    
    const url = `${URL_DELETE_COMORBILIDAD}?id=${this.state.comorbilidad.id}`;

    const params = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    confirmAlert({
      title: "Eliminar suscripcion?",
      message: "Estas seguro?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            fetch(url, params)
              .then((response) => response.json)
              .then((data) => {
                if (data.error) {
                  this.setState({
                    alert: {
                      type: "alert-danger",
                      message: data.error.message,
                    },
                  });
                } else {
                  this.props.history.push({
                    pathname: "/comorbilidad",
                  });
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    let { comorbilidad, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="updatecomorbilidad">
            <div className="addcomorbilidad__title">
              <h2>Editar Comorbilidad</h2>
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
                            type="hidden"
                            name="id"
                            onChange={this.handleChange}
                            defaultValue={comorbilidad.id}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            className={
                              this.hasError("nameComorbidity")
                                ? "is-invalid"
                                : ""
                            }
                            type="text"
                            name="nameComorbidity"
                            placeholder="Data 2"
                            onChange={this.handleChange}
                            defaultValue={comorbilidad.nameComorbidity}
                            errorDiv={
                              this.hasError("name_conmorbility")
                                ? "text-danger"
                                : "d-none"
                            }
                            errorMsg={"Please enter a title"}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="descriptionComorbidity"
                            placeholder="Data 3"
                            onChange={this.handleChange}
                            defaultValue={comorbilidad.descriptionComorbidity}
                          />
                        </Form.Group>

                        <div className="form-group column d-flex justify-content-center align-content-center ">
                          <br />
                          <button className="btn btn-primary ms-1">
                            Editar
                          </button>
                          <Link
                            to="/comorbilidad"
                            className="btn btn-warning ms-1 link2"
                          >
                            Cancelar
                          </Link>

                          <button className="btn btn-danger ms-1">
                            {comorbilidad.id > 0 && (
                              <a
                                href="#!"
                                onClick={() => this.confirmDelete()}
                                className="btn btn-danger ms-1"
                              >
                                Delete
                              </a>
                            )}
                          </button>
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
