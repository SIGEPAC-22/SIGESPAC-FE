import React,{Component, Fragment} from 'react';
import {Link } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout'

import './Comorbilidad.scss'



export default class Comorbilidad extends Component {
  state = {
    getSubscribe: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch("http://localhost:90/v1/pr-logic-svc/getSubscribe", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          getSubscribe: result,
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
    const { getSubscribe, isLoaded, error } = this.state;

    if(error){
      return <div>Error: {"The get request was not successful"+", "+"error: "+error.message}</div>;
    }else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          <BasicLayout className="comorbilidad">
          <div className='comorbilidad__title'>
        <h2>Comorbilidades</h2>
    </div>
    <br/>
          <div class={"container"}>
            <div class={"row"}>
              <div class={"col-lg-12"}>
                  <Link className={"btn btn-success"} to={`/add`}>{"Agregar"}</Link>
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
                          <th className='text-light'>Nombres</th>
                          <th className='text-light'>Apellidos</th>
                          <th className='text-light'>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                    {getSubscribe.map((s) => (
                    <tr>
                        <td className='text-light' key={s.id}>
                            {s.name}
                        </td>
                        <td className='text-light' key={s.id}>
                            {s.last_name}
                        </td>
                            <td>
                                <div class={"text-center"}>
                                    <div class={"btn-group"}>
                                        <Link className={"btn btn-primary btnEditar"} to={`/update/${s.id}`}>{"Editar"}</Link>
                                        <Link className={"btn btn-secondary btnDetalle"} to={`/detail/${s.id}`}>{"Detalle"}</Link>
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
