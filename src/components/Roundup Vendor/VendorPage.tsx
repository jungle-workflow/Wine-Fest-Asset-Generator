import { useEffect, useState } from 'react';
import { BuyerOrder, Distributor, Slice } from '../../types';

interface props {
    distributor: Distributor
    slice: Slice
    targetStore: string
}

export function VendorPage({ distributor, slice, targetStore }: props) {
    const [rows, setRows] = useState<React.ReactElement[]>([])
    const [filteredOrders, setFilteredOrders] = useState<BuyerOrder[]>([])

    useEffect(() => {
        // set the rows to be rendered
        const rows = []
        const filteredOrders = distributor.buyerOrders.filter((order)=> order['Pickup Location'] == targetStore)
        setFilteredOrders(filteredOrders)
        for (let i = slice.start; i < slice.end; i++) {
            if (filteredOrders[i])
                rows.push(
                    <VendorTR key={`TR-${i}`} order={filteredOrders[i]}></VendorTR>
                )
        }
        setRows(rows)
    }, [distributor])

    return (
        <div className="page vendor">
            <h1>{distributor?.name}</h1>
            <h1>${filteredOrders?.reduce((accumulator, currentValue) => accumulator + currentValue.Total, 0).toFixed(2)}</h1>
            <h1>Orders {slice.start}-{slice.start + rows.length} of {filteredOrders?.length}</h1>
            <br></br>
            <table style={{ border: '1px solid black' }}>
                <tbody>
                    <tr>
                        <td className='dropoffTD' style={{width: '20%'}}><b>Buyer</b></td>
                        {/* <td className='dropoffTD'><b>Buyer #</b></td> */}
                        {/* <td className='dropoffTD'><b>Pickup</b></td> */}
                        <td className='dropoffTD' style={{width: '60%'}}><b>Wine</b></td>
                        <td className='dropoffTD' style={{width: '10%'}}><b>Quantity</b></td>
                    </tr>
                    {rows && rows.length > 0 ? rows.map((row) => {
                        return row
                    }) : undefined}
                </tbody>
            </table>
        </div>
    )

}

interface TDprops {
    order: BuyerOrder
}

export function VendorTR({ order }: TDprops) {

    return <tr>
        <td className='dropoffTD name'>{order['First / Last']} <p>{order['Buyer\'s Club #']}, {order['Pickup Location']}</p></td>
        <td className='dropoffTD variety'>{order.Variety}</td>
        <td className='dropoffTD quantityTD'>{order.Quantity}</td>
        
    </tr>



}