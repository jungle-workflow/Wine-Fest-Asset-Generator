import { Distributor, Slice, VendorDestination } from '../../types';

interface props {
    distributor: Distributor
    slice: Slice
    targetStore: string
}


export function VendorPage({ distributor, slice, targetStore }: props) {
    const filteredByStore: VendorDestination[] = distributor.destinations.filter((destination) => destination.buyer.store === targetStore)
    const sliced = filteredByStore.slice(slice.start, slice.end)

    return (
        <div className="page vendor">
            <h1>{distributor.name}</h1>
            <h1>${filteredByStore.reduce((accumulator, destination) => accumulator + (destination.wine.Price * destination.quantity), 0).toFixed(2)}</h1>
            <h1>Orders {slice.start}-{slice.start + sliced.length} of {filteredByStore.length}</h1>
            <br></br>
            <table style={{ border: '1px solid black' }}>
                <tbody>
                    <tr>
                        <td className='dropoffTD' style={{ width: '20%' }}><b>Buyer</b></td>
                        <td className='dropoffTD' style={{ width: '20%' }}><b>Buyer ID</b></td>
                        <td className='dropoffTD' style={{ width: '50%' }}><b>Wine</b></td>
                        <td className='dropoffTD' style={{ width: '10%' }}><b>Quantity</b></td>
                    </tr>
                    {sliced.map((destination, index) => (
                        <VendorTR key={`TR-${slice.start + index}`} destination={destination} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface TRprops {
    destination: VendorDestination
}

export function VendorTR({ destination }: TRprops) {

    return <tr>
        <td className='dropoffTD name'>{destination.buyer.name}</td>
        <td className='dropoffTD id'>{destination.buyer.buyerId}</td>
        <td className='dropoffTD variety'>{destination.wine.Wine_Name}</td>
        <td className='dropoffTD quantityTD'>{destination.quantity}</td>

    </tr>



}