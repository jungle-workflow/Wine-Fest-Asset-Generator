import { Advertisement } from "../../types"

interface props {
    advertisement: Advertisement
    pageNum: number
    classAttr: string
}

export function AdvertisementBlock({ advertisement, pageNum, classAttr }: props) {
    advertisement && console.log(advertisement, pageNum, classAttr)
    return <>
        {advertisement && <img className={
            `advertisement ${classAttr} ${advertisement.isHalf
                ? 'half'
                : 'full'}
            `}
            src={advertisement.src}></img>}
        
    </>

}

export default AdvertisementBlock
