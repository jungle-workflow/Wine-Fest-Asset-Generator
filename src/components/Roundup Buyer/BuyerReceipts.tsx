import React, { useEffect, useState } from 'react';
import { Buyer, Slice } from '../../types';


interface props {
  buyers: Buyer[]
  slice: Slice
  targetStore: string
}

export function BuyerReceipts({ buyers, slice, targetStore }: props) {
  const [pages, setPages] = useState<React.ReactElement[]>([])

  useEffect(() => {
    const filteredBuyers = buyers.filter((buyer) => buyer.store === targetStore)
    setPages(getAllPages(filteredBuyers))
  }, [buyers, targetStore])

  const getAllPages = (buyers: Buyer[]) => {
    const pages: React.ReactElement[] = []

    buyers.forEach((buyer, i) => {
      const wines = Object.values(buyer.cart ?? {}).filter((wine) => {
        const quantity = Number(wine.quantity)
        return Number.isFinite(quantity) && quantity > 0
      })
      if (wines.length === 0) return

      const total = wines.reduce((sum, wine) => sum + wine.Price * Number(wine.quantity), 0)
      pages.push(
        <div key={`receipt-${i}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "flex-start", width: '8.5in', height: '11in', padding: '.25in', boxSizing: 'border-box', }}>

          <h1 style={{ fontSize: '30px' }}>{buyer.name} - ${total.toFixed(2)}</h1>
          <h2 style={{ fontSize: '20px', fontStyle: 'italic' }}>{buyer.buyerId} / {buyer.phone} / {buyer.email} / {buyer.store}</h2>
          <br></br>
          <table style={{ border: '1px solid black' }}>
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>Wine</td>
                <td>Quantity</td>
                <td>Bottle Price</td>
                <td>Sale</td>
              </tr>
              {wines.map((wine) => {
                const quantity = Number(wine.quantity)
                return <tr key={wine.Wine_ID}>
                  <td className='name'>{wine.Wine_Name}<p>{wine["Winery Name"]}</p></td>
                  <td>{quantity}</td>
                  <td>{wine.Price}</td>
                  <td>{(wine.Price * quantity).toFixed(2)}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )
    })

    return pages
  }


  return <>
    {pages && pages.length > 0 ? pages.slice(slice.start, slice.end) : undefined}
  </>
}

export default BuyerReceipts