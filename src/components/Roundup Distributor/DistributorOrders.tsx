import React from 'react';
import { Distributor } from '../../types';


interface props {
  distributors: Distributor[]
  targetStore: string
}

export function DistributorOrders({ distributors, targetStore }: props) {

  return <>
    {distributors.map((distributor, i) => {
      return <React.Fragment key={i}>
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: "flex-start",
          width: '8.5in',
          /* height: '11in', */
          padding: '.25in',
          boxSizing: 'border-box',
        }}>
          <h1>{distributor.name}</h1>
          <h1>Total: ${distributor.orders.filter((order)=> order.pickupLocation == targetStore).reduce((accumulator, currentValue) => accumulator + currentValue.total, 0).toFixed(2)}</h1>
          <br></br>
          <table style={{ border: '1px solid black' }}>
            <tbody>
              <tr>
                <td><b>Wine</b></td>
                <td><b>Quantity</b></td>
                <td><b>Bottle Price</b></td>
                <td><b>Line Total</b></td>
              </tr>
              {distributor.orders.filter((order)=> order.pickupLocation == targetStore).map((order, index) => {
                return <tr key={index}>
                  <td>{order.variety}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{order.total.toFixed(2)}</td>
                  {/* <td>{order.pickupLocation}</td> */}
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    })}
  </>
}

export default DistributorOrders