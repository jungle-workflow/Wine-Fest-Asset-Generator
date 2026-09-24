import { Booth, Bottle } from "../../types";
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';


interface props {
    booth: Booth,
    classAttr: string
    regionLabel: string
}

export default function Clipboard({ booth, classAttr: position, regionLabel }: props) {

    const [qr, setQr] = useState<string>()

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
        <div className={`boothContainer ${position}`}>
            {/* <img id="wine" src="./src/assets/wine.png" /> */}

            <div className="banner">
                <h3 className='tableNum'>{booth.bottles[0]["Booth #"]}</h3>
            </div>


            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    {booth.bottles[0].Is_VIP == "Yes"
                        ? undefined
                        : <p className="region">{booth.bottles[0].Region}</p>
                    }
                    <div className="bottles">
                        {booth.bottles.map((wine: Bottle, index) => {
                            return <>
                                <div className="bottle">
                                    <h2>{wine.Wine_Name}</h2>
                                </div>
                                {/* {index < booth.bottles.length - 1 ? <p>•</p> : undefined} */}
                            </>
                        })}
                    </div>
                    <div className='qrcontainer'>
                        <p><b className="scan-code">SCAN TO ORDER</b><br />
                            junglejims.com/order</p>
                        <img className="qr" src={qr} />
                    </div>
                </div>

            </div>


        </div>
    </>
}