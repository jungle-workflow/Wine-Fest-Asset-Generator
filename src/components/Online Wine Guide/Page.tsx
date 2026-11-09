import { Advertisement, Booth, kinds } from "../../types";
import AdvertisementBlock from "./AdvertisementBlock";
import BoothLayout from './BoothLayout';


interface props {
    slot1: Booth | Advertisement | undefined
    slot2: Booth | Advertisement | undefined
    pageNum: number
    regionLabel: string
}

export default function Page({ slot1, slot2, pageNum, regionLabel }: props) {
    return <>
        {slot1 && slot1.kind == kinds.booth
            ? <BoothLayout booth={slot1 as Booth} classAttr="top" regionLabel={regionLabel} pageNum={pageNum} />
            : <AdvertisementBlock advertisement={slot1 as Advertisement} pageNum={pageNum} classAttr="top"></AdvertisementBlock>}
        {slot2 && slot2.kind == kinds.booth
            ? <BoothLayout booth={slot2 as Booth} classAttr="bot" regionLabel={regionLabel} pageNum={pageNum} />
            : <AdvertisementBlock advertisement={slot2 as Advertisement} pageNum={pageNum} classAttr="bot"></AdvertisementBlock>}
    </>
}