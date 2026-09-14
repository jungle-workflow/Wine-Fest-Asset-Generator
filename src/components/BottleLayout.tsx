import { Bottle } from "../types";


interface props {
    bottle: Bottle
}

export function BottleLayout({ bottle }: props) {
    return <div className="bottle">
        <h2>{bottle["Wine Name / Type"]}</h2>
    </div>

}

export default BottleLayout