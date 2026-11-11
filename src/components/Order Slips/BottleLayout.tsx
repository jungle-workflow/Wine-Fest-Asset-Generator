import { Bottle } from "../../types";


interface props {
    bottle: Bottle
}

export function BottleLayout({ bottle }: props) {
        return <div className="bottle">
        
        <div className="details">
            {/* <p className="wineID">{bottle.Wine_ID}</p> */}
            <h2>{bottle.Wine_Name}</h2>
        </div>
        <h3 className="bold" >Quantity:</h3>
    </div>

}

export default BottleLayout