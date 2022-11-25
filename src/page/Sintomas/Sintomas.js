import React,{Component, Fragment} from 'react';
import {Link } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout'
import './Sintomas.scss'

export default class Sintomas extends Component {
  state = {
    getSintomas: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    const url = `${process.env.REACT_APP_URL_GET_ALL_SYMPTOMS}`;
    const params ={
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(url, params)
    .then((response) => response.json())
      .then((result) => {
        if (result === null){
          result = [];
        }
        this.setState({
          getSintomas: result,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
}

  render() {
    const { getSintomas, isLoaded, error } = this.state;

    if(error){
      return <div>Error: {"The get request was not successful"+", "+"error: "+error.message}</div>;
    }else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="sintomas">
          <div className='sintomas__title'>
        <h2>Sintomas</h2>
    </div>
    <br/>
          <div class={"container"}>
            <div class={"row"}>
              <div class={"col-lg-12"}>
                  <Link className={"btn btn-success"} to={`/addsintoma`}>{"Agregar"}</Link>
              </div>
            </div>
          </div>
            <br/>
          <div className={"container"}>
            <div className={"row"}>
              <div className={"col-lg-12"}>
                <div className={"table-responsive"}>
                  <table class={"table table-striped table-bordered table-condensed"}>
                    <thead class={"text-center"}>
                      <tr>
                          <th className='text-light'>Nombre Sintoma</th>
                          <th className='text-light'>Descripcion Sintoma</th>
                          <th className='text-light'>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                    {getSintomas.map((gt) => (
                    <tr>
                        <td className='text-light' key={gt.id}>
                            {gt.name_symptom}
                        </td>
                        <td className='text-light' key={gt.id}>
                            {gt.descriptionSymptom}
                        </td>
                            <td>
                                <div class={"text-center"}>
                                    <div class={"btn-group"}>
                                        <Link className={"btn btn-primary btnEditar"} to={`/updatesintoma/${gt.id}`}>{"Editar"}</Link>
                                        <Link className={"btn btn-secondary btnDetalle"} to={`/detailsintoma/${gt.id}`}>{"Detalle"}</Link>
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
