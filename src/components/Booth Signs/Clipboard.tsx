import { Booth, Wine } from "../../types";
import QRCode from 'qrcode'
import { useEffect, useState } from 'react';
import { getMajorityRegion } from "../../utils";


interface props {
    booth: Booth,
    classAttr: string
    regionLabel: string
}

export default function Clipboard({ booth, classAttr: position, regionLabel }: props) {
    const [region, setRegion] = useState<string>(regionLabel)
    const [qr, setQr] = useState<string>()

    useEffect(() => {
        // Generate the QR code
        console.log("Booth info:", booth);

        const genQR = async () => {
            try {
                const data = await QRCode.toDataURL(`junglejims.com/orderwine?booth=${String(booth.number).replace(/\s/g, "")}`, {
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

    useEffect(() => {
        //console.log(getMajorityRegion(booth, "Custom_Region").count, getMajorityRegion(booth, "Custom_Region").region)
        let region =
            getMajorityRegion(booth, "Custom_Region").count >= 5 && getMajorityRegion(booth, "Custom_Region").region !== ''
                ? getMajorityRegion(booth, "Custom_Region").region
                : getMajorityRegion(booth, "Subregion").count >= 4
                    ? getMajorityRegion(booth, "Subregion").region
                    : getMajorityRegion(booth, "Country").count >= 4
                        ? getMajorityRegion(booth, "Country").region
                        : getMajorityRegion(booth).region
        if (!region) {
            region = regionLabel
        }
        setRegion(region)
    }, [])

    useEffect(() => {
        console.log(region)
    }, [region])



    return <>
        <div className={`boothContainer ${position}`}>
            {/* <img id="wine" src="./src/assets/wine.png" /> */}

            <div className="banner">
                <h3 className='tableNum'>{booth.bottles[0]["Booth #"]}</h3>
            </div>


            <div className='title'>
                <div className='nameAndRegion'>
                    <h1>{booth.bottles[0].Booth_Name}</h1>
                    {/* booth.bottles[0].Is_VIP == "Yes"
                        ? undefined
                        :  */<p className="region">{region}</p>
                    }
                    <div className="bottles">
                        {booth.bottles.map((wine: Wine, index) => {
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
