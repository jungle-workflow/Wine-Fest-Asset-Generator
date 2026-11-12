import { useEffect, useState } from 'react'
import "./DistributorOrders.css"
import { assembleBuyerList, fetchOrderData, groupDistributors, paginate, save } from '../../utils.ts';
import { Buyer, BuyerAction, Distributor, saveFormat } from '../../types.ts';
import DistributorOrders from './DistributorOrders.tsx';

export function DistributorNavigator() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [slice, setSlice] = useState({ start: 0, end: 20 })


  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => {
      const data = await fetchOrderData();
      const allBuyers = assembleBuyerList(data)
      const buyersList = Object.entries(allBuyers).map(([_, buyer]) => buyer);
      const distributorList = groupDistributors(buyersList)
      setBuyers(buyersList)
      setDistributors(distributorList)
    };

    fetchData();
  }, [])

  useEffect(() => {
    console.log(slice);
    const handleKeyDown = (e: KeyboardEvent) => paginate(e, slice, setSlice)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, [slice])

  return <div id="all">
    {/* consider slicing booths in pieces because html2pdf taps out around 25 pages */}
    <DistributorOrders distributors={distributors} targetStore='Fairfield'></DistributorOrders>
  </div >
}