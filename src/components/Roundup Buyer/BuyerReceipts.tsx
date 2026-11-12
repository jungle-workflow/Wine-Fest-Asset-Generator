import React, { useEffect, useState } from 'react';
import { Buyer, Slice } from '../../types';


interface props {
  buyers: Buyer[]
  slice: Slice
  targetStore: string
}

export function BuyerReceipts({ buyers, slice, targetStore }: props) {
  const [pages, setPages] = useState<any[]>([])
  const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([])

  useEffect(() => {
    const filteredBuyers = buyers.filter((buyer)=> buyer['Pickup Location'] == targetStore)
    setFilteredBuyers(filteredBuyers)
    setPages(getAllPages(filteredBuyers))
  }, [buyers])

  const getAllPages = (buyers: Buyer[]) => {
    const pages: React.ReactElement[] = []


    buyers.map((buyer, i) => {
      pages.push(
        <div key={`receipt-${i}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "flex-start", width: '8.5in', height: '11in', padding: '.25in', boxSizing: 'border-box', }}>

          <h1 style={{ fontSize: '30px' }}>{buyer['Buyer name']} - ${buyer.orders.reduce((accumulator, currentValue) => accumulator + Number(currentValue['Total']), 0).toFixed(2)}</h1>
          <h2 style={{ fontSize: '20px', fontStyle: 'italic' }}>{buyer['Buyer\'s Club Number']} / {buyer.Phone}  / {buyer.Email} / {buyer['Pickup Location']}</h2>
          <br></br>
          <table style={{ border: '1px solid black' }}>
            <tr>
              <td style={{ width: "50%" }}>Wine</td>
              <td>Quantity</td>
              <td>Bottle Price</td>
              <td>Sale</td>
            </tr>
            {buyer.orders.map((order, index) => {
              return <tr key={index}>
                <td className='name'>{order.Variety}<p>{order.Winery}</p></td>
                <td>{order['Quantity']}</td>
                <td>{order['Wine Price']}</td>
                <td>{order['Total'].toFixed(2)}</td>
              </tr>

            })}
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