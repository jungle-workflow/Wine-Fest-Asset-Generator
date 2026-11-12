import { useEffect, useState } from 'react'
//@ts-ignore
import "./BuyerReceipts.css"
import { assembleBuyerList, fetchOrderData, paginate } from '../../utils.ts';
import { Buyer, Slice } from '../../types.ts';
import BuyerReceipts from './BuyerReceipts.tsx';

export default function BuyerNavigator() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [slice, setSlice] = useState<Slice>({ start: 0, end: 20 })


  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => {
      const data = await fetchOrderData();
      const allBuyers = assembleBuyerList(data)
      const buyersList = Object.entries(allBuyers).map(([_, buyer]) => buyer);
      setBuyers(buyersList)
    }
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
    <BuyerReceipts buyers={buyers} slice={slice} targetStore='Fairfield'></BuyerReceipts>
  </div >
}