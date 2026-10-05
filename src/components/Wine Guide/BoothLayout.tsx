import { Booth, Bottle } from "../../types";
import { getMajorityRegion } from "../../utils";
import BottleLayout from './BottleLayout';
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';


interface props {
    booth: Booth,
    //index: number,
    classAttr: string
    regionLabel: string
}

export function BoothLayout({ booth, classAttr: position, regionLabel }: props) {

    const [qr, setQr] = useState<string>()

    useEffect(() => {
        // Generate the QR code
        const genQR = async () => {
            try {
                const data = await QRCode.toDataURL(`junglejims.com/orderwine?booth=${booth.number}`, {
                    color: {
                        dark: '#b01b39',  // Blue dots
                        light: '#0000' // Transparent background
                    }
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



    return <>
        {booth?.bottles ? <div className={`boothContainer ${position}`}>

            <div className='banner'>
                <div className='tableNumContainer'>
                    <p>BOOTH</p>
                    <span className='tableNum'>{booth.bottles[0]["Booth #"]}</span>
                </div>

                <img src='./src/assets/Monorail-Red.png' className='monorail'></img>

                <div className='qrcontainer'>
                    <img className="qr" src={qr} />
                    <b className="scan-code">SCAN TO ORDER</b>
                </div>
            </div>

            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    <p className="region">{getMajorityRegion(booth)}</p>
                    {/* only display region if the region is shared between all bottles */}
                </div>
            </div>

            <div className="bottles">
                {booth.bottles.map((wine: Bottle, index) => {
                    return <BottleLayout bottle={wine} key={index}></BottleLayout>
                })}
            </div>
        </div>
            : <p>No Bottles</p>}
    </>
}

export default BoothLayout