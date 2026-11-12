import React, { useEffect, useState } from 'react';
import {Distributor, Slice } from '../../types';
import { VendorPage } from './VendorPage';


interface props {
  distributors: Distributor[]
  slice: Slice
  targetStore: string
}

export function VendorDropOff({ distributors, slice, targetStore }: props) {
  const [pages, setPages] = useState<any[]>([])
  
  useEffect(() => {
    setPages(getAllPages(distributors))
  }, [distributors])

  const getAllPages = (distributors: Distributor[]) => {
    const pages: React.ReactElement[] = []
    

    distributors.forEach((distributor, i) => {
      const filteredOrders = distributor.buyerOrders.filter((order) => order['Pickup Location'] == targetStore)
      distributor.buyerOrders = filteredOrders
      let pageLength = 15
      let count = 0
      for (let j = 0; j < 10; j++) {
        console.log(`slice: ${count} ${count + pageLength}`, distributor.name);
        
        if (filteredOrders.length > count) {
          pages.push(
            <VendorPage distributor={distributor} slice={{ start: count, end: count += pageLength }} targetStore={targetStore} key={`dist-${i}-page-${j}`}></VendorPage>
          )
        }
      }
    })
    return pages
  }



  return <>
    {pages && pages.length > 0 ? pages.slice(slice.start, slice.end) : undefined}
  </>
}

export default VendorDropOff