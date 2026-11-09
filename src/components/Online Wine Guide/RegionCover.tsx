import { Region } from "../../types"

interface props {
    region: Region,

}

export function RegionCover({ region,}: props) {
    return <div className="content">
        {/* <p>Destination</p> */}
        {/* <hr /> */}
        <h1>{region.name}</h1>
    </div>

}

export default RegionCover