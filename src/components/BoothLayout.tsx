import { Booth, Bottle } from "../types";
import BottleLayout from './BottleLayout';
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';


interface props {
    booth: Booth,
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
                        dark: '#fff',  // Blue dots
                        light: '#0000' // Transparent background
                    },
                    margin: 0
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
        <div className={`boothContainer ${position}`}>
            {/* <img id="wine" src="./src/assets/wine.png" /> */}

            <div className="banner">
                <div className='tableNumContainer'>
                    {/* <p>BOOTH</p> */}
                    <span className='tableNum'>{booth.bottles[0]["Booth #"]}</span>
                </div>

                <div className='qrcontainer'>
                    <img className="qr" src={qr} />
                    <b className="scan-code">SCAN TO ORDER</b>
                </div>
            </div>


            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0]["Booth Name"]}</h1>
                    {booth.bottles[0]["Is this a connoisseur/VIP wine?"] == "Yes"
                        ? undefined
                        : <p className="region">{booth.bottles[0]['What country or region is this wine from?']}</p>
                    }
                    {/* <div className="bottles">
                        {booth.bottles.map((wine: Bottle, index) => {
                            return <><BottleLayout bottle={wine} key={index}></BottleLayout><p>•</p></>
                        })}
                    </div> */}
                </div>

            </div>


        </div>
    </>
}

export default BoothLayout