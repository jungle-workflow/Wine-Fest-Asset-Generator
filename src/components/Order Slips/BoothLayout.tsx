import { Booth, Bottle } from "../../types";
import BottleLayout from './BottleLayout';
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';

interface props {
    booth: Booth,
    classAttr: string
    regionLabel: string
}

export function BoothLayout({ booth }: props) {

    const [, setQr] = useState<string>()

    useEffect(() => {
        // Generate the QR code
        console.log("Booth info:", booth);
        
        const genQR = async () => {
            try {
                const data = await QRCode.toDataURL(`junglejims.com/orderwine?booth=${booth.number}`, {
                    color: {
                        dark: '#b01b39',  // Blue dots
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
         <div className={`boothContainer`}>

            <div className='banner'>
                <div className='tableNumContainer'>
                    <p>TABLE</p>
                    <span className='tableNum'>{booth.bottles[0]["Booth #"]}</span>
                </div>
            </div>

            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    {/* <p className="region">{booth.bottles[0].Region}</p> */}
                </div>
            </div>

            <div className="bottles">
                {booth.bottles.map((wine: Bottle, index) => {
                    return <BottleLayout bottle={wine} key={index}></BottleLayout>
                })}
            </div>
        </div>
    </>
}

export default BoothLayout