import React, { useEffect, useState } from 'react'
//@ts-ignore
import "./OrderSlips.css"
import { fetchWineData, format, groupBooths, save } from '../../utils.ts';
import { Booth, Bottle } from '../../types.ts';
import Page from './Page.tsx';

export default function OrderSlipNavigator() {
  const [slice, setSlice] = useState({ start: 0, end: 25 })
  const [pages, setPages] = useState<any[]>([])
  const [booths, setBooths] = useState<Booth[]>([])

  useEffect(() => {
    console.log(slice);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'ArrowRight') {
        setSlice(prev => ({
          start: prev.end,
          end: prev.end + (slice.end-slice.start)
        }))
      } else if (e.key == 'ArrowLeft') {
        setSlice(prev => ({
          start: Math.max(0, prev.start - (slice.end-slice.start)),
          end: prev.start
        }));
      } else if (e.key == "Enter") {
        save((slice), format.slips);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slice])

  useEffect(() => {  // fetch the initial data and set the state
    const fetchData = async () => {
      try {
        //console.log("Fetching data");
        const data: Bottle[] = await fetchWineData();
        const sortedData: Booth[] = groupBooths(data)
        setBooths(sortedData)
      } catch {
        console.log("Error fetching data in useEffect");
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    setPages(getAllPages(booths))
  }, [booths])

  const getAllPages = (booths: Booth[]): React.ReactElement[] => {
    const pages: React.ReactElement[] = []
    booths.forEach((booth) => {

      pages.push(<>
        <div key={`1${booth.number}`} style={{ display: 'flex', justifyContent: 'space-around', width: '8.5in', height: '' }}>
          <Page key={`1${booth.number}-page`} booth={booth} pageNum={0} regionLabel={''}></Page>
          <Page key={`2${booth.number}-page`} booth={booth} pageNum={0} regionLabel={''}></Page>
        </div>
        <div key={`4${booth.number}`} style={{ display: 'flex', justifyContent: 'space-around', width: '8.5in', height: '' }}>
          <Page key={`1${booth.number}-page`} booth={booth} pageNum={0} regionLabel={''}></Page>
          <Page key={`2${booth.number}-page`} booth={booth} pageNum={0} regionLabel={''}></Page>
        </div>
      </>
      )
    });
    return pages
  }

  return <div className="slips">
    {/* consider slicing booths in pieces because html2pdf taps out around 25-35 pages */}
    {/* {/* {getAllPages(regions)/* .slice(slice.start, slice.end) */}
    {pages && pages.length > 0 ? pages.slice(slice.start, slice.end) : undefined}




  </div >
}