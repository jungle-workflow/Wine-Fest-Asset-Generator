import { Bottle } from "../../types";


interface props {
    bottle: Bottle
    regionSection: string
    regionOverride?: string // used for overriding the compare to region (when all subregions are the same)
}

export function BottleLayout({ bottle, regionSection, regionOverride }: props) {
    return <div className="bottle">
        <h2>{bottle.Wine_Name}</h2>
        
            {bottle.Subregion === regionOverride || bottle.Subregion === regionSection
                ? undefined : <h4>{bottle.Subregion}</h4>}
        
    </div>

}

export default BottleLayout