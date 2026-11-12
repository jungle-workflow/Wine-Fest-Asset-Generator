import { useEffect, useState } from 'react'
import "./VendorDropOff.css"
import { fetchOrderData, groupDistributors, groupOrders, paginate } from '../../utils.ts';
import { Buyer, Distributor, BuyerOrder } from '../../types.ts';
import VendorDropOff from './VendorDropOff.tsx';

export function VendorNavigator() {
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [slice, setSlice] = useState({ start: 0, end: 20 })


  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => { // buyer's club orders
      try {
        const data: BuyerOrder[] = await fetchOrderData();
        const sortedDistributors: Distributor[] = groupDistributors(data)
        setDistributors(sortedDistributors)
      } catch {
        console.log("Error fetching data in useEffect");
      }
    };

    fetchData();

  }, [])

  useEffect(() => {
    console.log(slice);
    const handleKeyDown = (e: KeyboardEvent) => paginate(e, slice, setSlice)

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slice])

  return <div id="all">
    {/* consider slicing booths in pieces because html2pdf taps out around 25 pages */}
    <VendorDropOff distributors={distributors} slice={slice} targetStore='Fairfield'></VendorDropOff>
  </div >
}