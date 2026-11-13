import { useEffect, useState } from 'react'
import "./VendorDropOff.css"
import { assembleBuyerList, fetchOrderData, groupDistributors, paginate } from '../../utils.ts';
import { Distributor } from '../../types.ts';
import VendorDropOff from './VendorDropOff.tsx';

export function VendorNavigator() {
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [slice, setSlice] = useState({ start: 0, end: 20 })


  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => { // buyer's club orders
      const data = await fetchOrderData();
            const allBuyers = assembleBuyerList(data)
      const buyersList = Object.values(allBuyers);
            const distributorList = groupDistributors(buyersList)
            setDistributors(distributorList)
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