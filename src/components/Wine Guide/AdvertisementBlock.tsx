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
            ${pageNum % 2 == 0 ? "right" : "left"}`}
            src={advertisement.src}></img>}

        {advertisement && advertisement.isHalf
            ? <img className={
                `advertisement absolute ${classAttr} ${advertisement.isHalf
                    ? 'half'
                    : 'full'}
            ${pageNum % 2 == 0 ? "right" : "left"}`}
                src={advertisement.src}></img> : undefined}
    </>

}

export default AdvertisementBlock
