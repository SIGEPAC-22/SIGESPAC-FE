import React from 'react'
import BasicLayout from '../../../layout/BasicLayout'
import './DetailComorbilidad.scss'

export default function DetailComorbilidad() {
    
  return (
    <BasicLayout className="detailcomorbilidad">
        <div className='detailcomorbilidad__title'>
        <h2>Detalle de {'nombre comorbilidad'}</h2>
    </div>
    <>
    <div className="float-start text-light">
            <h4>id: {'id'}</h4>
          </div>
          <br></br>
          <hr></hr>
          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td className='fw-bold text-light fs-5'>
                 data1:
                </td>
                <td className='text-light fs-5'>{'valuedata1'}</td>
              </tr>
              <tr>
                <td className='fw-bold text-light fs-5'>
                  data2:
                </td>
                <td className='text-light fs-5'>{'valuedata3'}</td>
              </tr>
              <tr>
                <td className='fw-bold text-light fs-5'>
                  data3:
                </td>
                <td className='text-light fs-5'>{'valuedata3'}</td>
              </tr>
              
            </tbody>
          </table>
    </>
    </BasicLayout>
  )
}
