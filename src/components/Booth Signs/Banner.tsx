import { Booth } from "../../types";
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';


interface props {
    booth: Booth,
    classAttr: string
    regionLabel: string
}

export function BoothBanner({ booth, classAttr: position }: props) {

    const [qr, setQr] = useState<string>()

    useEffect(() => {
        // Generate the QR code
        const genQR = async () => {
            try {
                const data = await QRCode.toDataURL(`junglejims.com/orderwine?booth=${booth.number}`, {
                    color: {
                        dark: '#fff',
                        light: '#0000'
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
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    {booth.bottles[0].Is_VIP == "Yes"
                        ? undefined
                        : <p className="region">{booth.bottles[0].Region}</p>
                    }
                </div>

            </div>


        </div>
    </>
}

export default BoothBanner