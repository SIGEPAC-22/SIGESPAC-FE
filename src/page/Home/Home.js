import React from 'react'
import Banner from '../../components/Banner';
import BasicLayout from '../../layout/BasicLayout';

import "./Home.scss"

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  return (
    
   <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
    <>
    <Banner/>
    <br/>
    <div className={"container"} >
                            <div className={"row"}>
                                <div className={"col-sm-4"}>
                                    <div className={"card"}>
                                        <img className="card-img-top" src={"https://pbs.twimg.com/media/FctyTUYXkAATyWo?format=jpg&name=large"} />
                                        <div className={"card-body"}>
                                            <h5 className="card-title text-dark">Hospital El Salvador @HospitalSV</h5>
                                            <p className="card-text text-dark">El hospital más grande y más moderno de Latinoamérica. Para el pueblo, siempre lo mejor.</p>
                                            <a href="https://twitter.com/hospitalsv"
                                               className="btn btn-primary">Siguenos</a>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-sm-4"}>
                                    <div className={"card"}>
                                        <img className="card-img-top" src={"https://hes.salud.gob.sv/wp-content/uploads/2022/07/Imagen-COVID-19.png"}/>
                                        <div className={"card-body"}>
                                            <h5 className="card-title text-dark">Situación Nacional Covid-19</h5>
                                            <p className="card-text text-dark">La actualización Epidemiológica Semanal proporciona una descripción general de los casos y muertes de COVID-19 a nivel mundial, regional y nacional, destacando datos y tendencias clave[…]</p>
                                            <a href="https://covid19.gob.sv/"
                                               className="btn btn-primary">Leer más</a>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-sm-4"}>
                                    <div className={"card"}>
                                        <img class="card-img-top" src={"https://hes.salud.gob.sv/wp-content/uploads/2021/05/Logo_Hospital_El_Salvador-1-1024x478.jpg"}/>
                                        <div className={"card-body"}>
                                            <h5  class="card-title text-dark" >Promoción de la participación Medica</h5>
                                            <p className="card-text text-dark">Desde la subdirección de Promoción de la Participación Juvenil teniendo como principal objetivo el de promover la participación plena de la población joven en el campo cívico […]</p>
                                            <a href="https://hes.salud.gob.sv/promocion-de-la-participacion-juvenil/" className="btn btn-primary">Leer más</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    </>
   </BasicLayout>
      
  );
}
