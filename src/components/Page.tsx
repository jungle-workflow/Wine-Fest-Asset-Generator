import { Advertisement, Booth, kinds } from "../types";
import AdvertisementBlock from "./AdvertisementBlock";
import BoothLayout from './BoothLayout';
//import BoothLayout from '../assets/2024 Vendor Ads/Podcast_Header_Square-BW.jpg';


interface props {
    slot1: Booth | Advertisement | undefined
    pageNum: number
    regionLabel: string
}

export function Page({ slot1, pageNum, regionLabel }: props) {
    return <div className={`page ${pageNum % 2 == 0 ? "right" : "left"}`}>
        <img id="wine" src="./src/assets/wine.png" />

        <div className={`bleed ${pageNum % 2 == 0 ? "right" : "left"}`}>
            <img className="spineGuides" src="./src/assets/spine-guides.png" />

            <img className="cropMark top left" src="./src/assets/crop-mark.png" />
            <img className="cropMark top right" src="./src/assets/crop-mark.png" />
            <img className="cropMark bottom left" src="./src/assets/crop-mark.png" />
            <img className="cropMark bottom right" src="./src/assets/crop-mark.png" />

            <div className={`bleedContent ${pageNum % 3 == 0 ? 'footerSpace' : ''}`}>
                <BoothLayout booth={slot1 as Booth} classAttr="top" regionLabel={regionLabel} />


            

            </div>{pageNum % 3 == 0
                ? <div className={`footer ${pageNum % 2 == 0 ? "right" : "left"}`}>
                    <div>
                        <img src="./src/assets/scanning-illustration.png" />
                    </div>
                    <p>Use your smartphone camera to scan QR codes and order wine!
                    </p>
                    <p className={`pageNumber ${pageNum % 2 == 0 ? "right" : "left"}`}>{pageNum}</p>
                </div>
                : undefined}
        </div>
    </div >
}

export default Page