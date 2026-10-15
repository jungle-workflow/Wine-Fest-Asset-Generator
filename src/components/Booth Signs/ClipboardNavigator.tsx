import React, { useEffect, useRef, useState } from 'react'
import { fetchWineData, groupBooths, groupRegions, save } from '../../utils.ts';
import { Booth, Bottle, Region } from '../../types.ts';
import Clipboard from './Clipboard.tsx';
import "./Clipboard.css"

export default function ClipboardNavigator() {
  const [slice, setSlice] = useState({ start: 0, end: 20 })
  const [pages, setPages] = useState<any[]>([])
  const [booths, setBooths] = useState<Booth[]>([])

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
        save((slice));
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
    booths.forEach((booth, i) => {

      pages.push(<Clipboard booth={booth} classAttr='' key={`${booth.number}`} regionLabel={booth.bottles[0].Region} ></Clipboard>)
    });
    return pages
  }

  return <>
    <div className="clipboard">
      {/* paginate because html2pdf taps out around 25-35 pages */}
      {pages && pages.length > 0 ? pages.slice(slice.start, slice.end) : undefined}
    </div >
  </>
}