import React from 'react';
import { Distributor, Slice } from '../../types';
import { VendorPage } from './VendorPage';

interface props {
  distributors: Distributor[]
  slice: Slice
  targetStore: string
}



export function VendorDropOff({ distributors, slice, targetStore }: props) {
  const pages: React.ReactElement[] = []

  distributors.forEach((distributor, i) => {
    const filteredOrders = distributor.orders.filter((order) => order.pickupLocation === targetStore)
    for (let j = 0; j * 15 < filteredOrders.length; j++) {
      const start = j * 15
      if (start >= filteredOrders.length) break

      pages.push(
        <VendorPage
          distributor={distributor}
          slice={{ start, end: start + 15 }}
          targetStore={targetStore}
          key={`dist-${i}-page-${j}`}
        />
      )
    }
  })

  return <>
    {pages.slice(slice.start, slice.end)}
  </>
}

export default VendorDropOff