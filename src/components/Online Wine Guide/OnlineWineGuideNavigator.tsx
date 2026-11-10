import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import "./OnlineWineGuide.css"
import { fetchWineData, groupBooths, groupRegions } from '../../utils.ts';
import { Bottle, Region } from '../../types.ts';
import Page from './Page.tsx';
import { advertisements } from './Advertisements.ts';
import RegionCover from './RegionCover.tsx';

export default function OnlineWineGuide() {
  const [regions, setRegions] = useState<Region[]>([])
  let pageCounter = useRef(14)
  let advIndex = useRef(0)
  const [pages, setPages] = useState<any[]>([])
  const dateOfShow: Date = new Date("Tue Nov 14 2026 14:00:00 GMT-0500 (Eastern Standard Time)")
  //const dateOfShow: Date = new Date("Tue Nov 10 2026 12:36:31 GMT-0500 (Eastern Standard Time)")
  //console.log(dateOfShow)

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
    regions.forEach((region) => {
      pages.push(
        <div id={region.name} key={region.name} className='regionSection' style={{ display: region.name ? "flex" : "none" }}>
          <RegionCover region={region}></RegionCover>
          {getRegionPages(region)}
        </div>
      )
    });
    return pages
  }

  return <div className='online-wine-guide'>
    <nav className="regionNavigation" aria-label="Jump to wine region">
      {regions.map((region) => (
        <button
          key={region.name}
          type="button"
          className='roundButton'
          style={{ display: region.name ? "flex" : "none" }}
          onClick={() => document.getElementById(region.name)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          {region.name}
        </button>
      ))}
    </nav>
    {pages}
    <div className='floatingButtons'>
      <a href="https://cdn.prod.website-files.com/69d901034128ef51d50cd85b/6af2255d28dc149853ce1dbc_Web%20Map-Combined.avif">
        <button className="roundButton" value="View Map">View Map</button>
      </a>
      {new Date() <= dateOfShow
        ? < a href="https://www.eventbrite.com/cc/jungle-jims-international-wine-festival-3560789/?aff=escb&utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-source=cp&utm-term=odclsxcollection" target='blank'><button className="roundButton" value="Order Wine">Get Tickets</button></a>
        : <a href="https://junglejims.com/order" target='blank'><button className="roundButton" value="Order Wine">Order Wine</button></a>}
    </div>



  </div >
}