import { Booth, Wine } from "../../types";
import { getMajorityRegion } from "../../utils";
import BottleLayout from './BottleLayout';
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';


interface props {
    booth: Booth,
    //index: number,
    classAttr: string
    regionLabel: string
    pageNum: number
}

export function BoothLayout({ booth, classAttr: position, regionLabel, pageNum }: props) {

    const [qr, setQr] = useState<string>()
    const [boothRegion, setBoothRegion] = useState<string>()

    useEffect(() => {
        // Generate the QR code
        const genQR = async () => {
            try {
                const data = await QRCode.toDataURL(`junglejims.com/orderwine?booth=${String(booth.number).split(' ').join('')}`, {
                    color: {
                        dark: '#b01b39', // dots
                        light: '#0000',
                    },
                    margin: 0,
                    errorCorrectionLevel: 'M',
                })
                return data
            } catch (err) {
                console.error(err)
            }
            return ''
        }

        const genQr2 = async () => {
            const data = await genQR()
            //console.log(data)
            setQr(data)
        }

        genQr2()
        
    }, [])

    useEffect(() => {
        console.log(getMajorityRegion(booth, "Custom_Region").count, getMajorityRegion(booth, "Custom_Region").region)
        const region =
             getMajorityRegion(booth, "Custom_Region").count >= 5 && getMajorityRegion(booth, "Custom_Region").region !== ''
                ? getMajorityRegion(booth, "Custom_Region").region
                : getMajorityRegion(booth, "Subregion").count >= 4
                    ? getMajorityRegion(booth, "Subregion").region
                    : getMajorityRegion(booth, "Country").count >= 4
                        ? getMajorityRegion(booth, "Country").region
                        : getMajorityRegion(booth).region

        setBoothRegion(region)
    }, [booth])



    return <>
        {booth?.bottles ? <div className={`boothContainer ${position}`}>

            <div className='banner'>
                <div className='tableNumContainer'>
                    <p>BOOTH</p>
                    <span className='tableNum'>{booth.bottles[0]["Booth #"]}</span>
                </div>

                <img src='./src/assets/Monorail-Red.png' className={`monorail ${pageNum % 2 == 0 ? 'left' : 'right'}`}></img>

                <div className='qrcontainer'>
                    <img className="qr" src={qr} />
                    <b className="scan-code">SCAN TO ORDER</b>
                </div>
            </div>

            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    <p className="region">{
                        /* only display region if the region or country is shared between all bottles */
                        boothRegion
                            ? boothRegion
                            : (regionLabel !== "VIP"
                                ? regionLabel
                                : getMajorityRegion(booth).region)
                    }</p>
                </div>
            </div>

            <div className="bottles">
                {booth.bottles.map((wine: Wine, index) => {
                    return <BottleLayout bottle={wine} key={index} regionSection={regionLabel} regionOverride={boothRegion}></BottleLayout>
                })}
            </div>
        </div>
            : <p>No Bottles</p>}
    </>
}

export default BoothLayout