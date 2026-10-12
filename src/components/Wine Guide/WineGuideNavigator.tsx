import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import "./WineGuide.css"
import { fetchWineData, groupBooths, groupRegions, save } from '../../utils.ts';
import { Bottle, Region } from '../../types.ts';
import Page from './Page.tsx';
import RegionCover from './RegionCover.tsx';
import { advertisements } from './Advertisements.ts';

export default function WineGuide() {
  const [regions, setRegions] = useState<Region[]>([])
  let pageCounter = useRef(14)
  let advIndex = useRef(0)
  const [slice, setSlice] = useState({ start: 0, end: 20 })
  const [pages, setPages] = useState<any[]>([])

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
        const sortedData: Region[] = groupRegions(groupBooths(data));
        console.log(sortedData)
        //setBooths(sortedData);
        setRegions(sortedData)
      } catch {
        console.log("Error fetching data in useEffect");
      }
    };
    fetchData();

  }, [])

  useEffect(() => {
    console.log("Regions updated, generating pages");
    setPages(getAllPages(regions))
  }, [regions])

  const getRegionPages = (region: Region): React.ReactElement[] => {
    // this method assembles the page array per region, and fills both "slots" in the Page component
    // It uses some logic to determine if a slot is approriate for an ad or a booth
    let boothIndex = 0
    let j = 0
    const advInterval = 5
    const pages: React.ReactElement[] = []

    while (boothIndex < region.booths.length) {
      let slot1, slot2
      let isFooterpage = pageCounter.current % 3 == 0
      let queueAdv: boolean = pageCounter.current >= advertisements[advIndex.current]?.index // if the current page index is >= than the next advertisement target page, then slot the ad in
      
      if (queueAdv && !isFooterpage) {
          slot2 = advertisements[advIndex.current++]
          slot1 = slot2.isHalf ? region.booths[boothIndex++] : undefined // if slot 2 is full then undefined
      } else {
        slot1 = region.booths[boothIndex++]
        slot2 = region.booths[boothIndex++]
      }

      pages.push(
        <Page key={`page${region.name}${j}`}
          slot1={slot1}
          slot2={slot2}
          regionLabel={region.name}
          pageNum={pageCounter.current++} />
      )
      j++
    }

    return pages
  }

  const getAllPages = (regions: Region[]): React.ReactElement[] => {
    pageCounter.current = 14
    advIndex.current = 0
    const pages: React.ReactElement[] = []
    regions.forEach((region, i) => {
      if (region.name == "VIP") {
        pages.push(<RegionCover region={region} index={i} pageNum={pageCounter.current++} />)
      }
      pages.push(<RegionCover region={region} index={i} pageNum={pageCounter.current++} />)
      pages.push(...getRegionPages(region))
    });
    return pages
  }

  return <div className='wine-guide'>
    {/* consider slicing booths in pieces because html2pdf taps out around 25-35 pages */}
    {/* {/* {getAllPages(regions)/* .slice(slice.start, slice.end) */}
    {pages && pages.length > 0 ? pages.slice(slice.start, slice.end) : undefined}




  </div >
}