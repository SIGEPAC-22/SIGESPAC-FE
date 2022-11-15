import React from 'react';
import {Link } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout'

import './Comorbilidad.scss'

export default function Comorbilidad() {
    

  return (
   <BasicLayout className="comorbilidad">
    <div className='comorbilidad__title'>
        <h2>Comorbilidades</h2>
    </div>
    <>
    <br></br>
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
                              <th className='text-light'>Data 1</th>
                              <th className='text-light'>Data 2</th>
                              <th className='text-light'>Data 3</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                                <td>
                                    <div class={"text-center"}>
                                        <div class={"btn-group"}>
                                            <Link className={"btn btn-primary btnEditar"} to={`/update/:id`}>{"Editar"}</Link>
                                            <Link className={"btn btn-secondary btnDetalle"} to={`/detail/:id`}>{"Detalle"}</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
    </>
   </BasicLayout>
  );
}
