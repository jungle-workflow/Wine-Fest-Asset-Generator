import { useEffect, useState } from 'react'
import "./DistributorOrders.css"
import { fetchOrderData, groupDistributors, groupOrders, save } from '../../utils.ts';
import { Buyer, Distributor, BuyerOrder, saveFormat } from '../../types.ts';
import DistributorOrders from './DistributorOrders.tsx';

export function DistributorNavigator() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [slice, setSlice] = useState({ start: 0, end: 20 })


  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => { // buyer's club orders
      try {
        //console.log("Fetching data");
        const data: BuyerOrder[] = await fetchOrderData();
        const sortedBuyers: Buyer[] = groupOrders(data)
        const sortedDistributors: Distributor[] = groupDistributors(data)
        console.log(sortedBuyers)
        //setBooths(sortedData);
        setBuyers(sortedBuyers)
        setDistributors(sortedDistributors)
      } catch {
        console.log("Error fetching data in useEffect");
      }
    };

    fetchData();

  }, [])

  useEffect(() => {
    console.log(slice);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'ArrowRight') {
        setSlice(prev => ({
          start: prev.end,
          end: prev.end + 20
        }))
      } else if (e.key == 'ArrowLeft') {
        setSlice(prev => ({
          start: Math.max(0, prev.start - 20),
          end: prev.start
        }));
      } else if (e.key == "Enter") {
        save((slice), saveFormat.clipboard);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slice])

  return <div id="all">
    {/* consider slicing booths in pieces because html2pdf taps out around 25 pages */}
    <DistributorOrders distributors={distributors} targetStore='Fairfield'></DistributorOrders>
  </div >
}