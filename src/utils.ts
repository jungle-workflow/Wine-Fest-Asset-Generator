import { Booth, Wine, Buyer, Distributor, DistributorOrder, saveFormat, kinds, Region, Slice, routes, RawRecord, BuyerAction, BuyerFormSubmit, UpdateCart } from "./types";
import html2pdf from 'html2pdf.js';

export const fetchWineData = async (): Promise<Wine[]> => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbz4yrN6sQF9b1foeOmfD_5lvrrghd0MAqXRwcsy-Bv-l12XdChOGnbIzMwkVV2YHMFcRA/exec");
        //const response = await fetch("/src/assets/data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const bottleData = data.data
        console.log(bottleData);

        return bottleData as Wine[]
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Ensure the error is propagated if necessary 
    }
}


export const fetchOrderData = async (): Promise<BuyerAction[]> => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbz4yrN6sQF9b1foeOmfD_5lvrrghd0MAqXRwcsy-Bv-l12XdChOGnbIzMwkVV2YHMFcRA/exec",
            {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                    action: routes.getBuyers,
                }),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            }
        )
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var data = await response.json();
        //console.log(data);

        var rawBuyerData = data.buyerData as RawRecord[]
        const parsedBuyerActions: BuyerAction[] = []

        for (const record of rawBuyerData) {
            parsedBuyerActions.push(JSON.parse(record.Data).body)
        }

        return parsedBuyerActions

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Ensure the error is propagated if necessary 
    }
}

export const save = (slice: any, exportFormat: string): Promise<void> => {
    // save the pdf
    console.log("saving");

    let selector = "", props = {}

    if (exportFormat == saveFormat.banner) {
        selector = '.booth-banner'
        props = {
            filename: `2026_banners_${slice.start}-${slice.end}`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: [10, 36], orientation: "landscape" }
        }
    }

    if (exportFormat == saveFormat.clipboard) {
        selector = '.clipboard'
        props = {
            filename: `2026_clipboards_${slice.start}-${slice.end}`,
            image: { type: 'png', quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [8.5, 11], orientation: "portrait" }
        }
    }

    if (exportFormat == saveFormat.spreadsheet) {
        selector = '.spreadsheet'
        props = {
            filename: `2026_clipboards_${slice.start}-${slice.end}`,
            image: { type: 'jpg', quality: .95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [8.5, 11], orientation: "portrait" }
        }
    }

    if (exportFormat == saveFormat.guide) {
        selector = '.wine-guide'
        props = {
            filename: `2026_wine-guide_${slice.start}-${slice.end}`,
            image: { type: 'png', quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [4, 8.75], orientation: "portrait" }
        }
    }

    if (exportFormat == saveFormat.slips) {
        selector = '.slips'
        props = {
            filename: `2026_slips_${slice.start}-${slice.end}`,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: [8.5, 11], orientation: "portrait" }
        }
    }

    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Could not find the ${selector} to export`);

    return html2pdf(element, props)

}

export const groupBooths = (response: Wine[]): Booth[] => {
    // take in the json response and return an object containing each section as an array of items in that section
    // Assuming your data is in an array of objects
    // Initialize an empty object to store the grouped data
    const booths: Booth[] = []

    // Loop through the data and group by the key
    response.forEach((bottle: Wine) => {
        if (bottle.Exclude) { return }
        const boothNum: string = String(bottle["Booth #"])
        const existingBooth: Booth | undefined = booths.find((booth) => booth.number == boothNum);

        if (existingBooth) {
            existingBooth.bottles.push(bottle)
        } else {
            // If the section doesn't exist in the groupedData object, create it
            const booth: Booth = {
                name: bottle["Booth_Name"],
                number: String(bottle["Booth #"]),
                ID: bottle.Wine_ID,
                bottles: [bottle],
                kind: kinds.booth
            }
            booths.push(booth)
        }
    });
    booths.sort((a, b) => {
        const getNumber = (val: Booth) => parseInt(String(val.number).replace(/^C/, '100'), 10);
        return getNumber(a) - getNumber(b);
    })
    return booths
}

export const sortRegions = (regions: Region[]): Region[] => {
    const regionOrder = ["Pacific Northwest", "California", "Finger Lakes", "Midwest", "VIP"]
    return regions.sort((a, b) => {
        const aIndex = regionOrder.indexOf(a.name)
        const bIndex = regionOrder.indexOf(b.name)
        const aOrder = aIndex === -1 ? 0 : aIndex + 1
        const bOrder = bIndex === -1 ? 0 : bIndex + 1
        return aOrder - bOrder
    })
}

export const groupRegions = (booths: Booth[]): Region[] => {
    const regions: Region[] = []

    booths.forEach((booth: Booth) => {
        const regionSection: string = `${booth.number}`.includes("VIP") ? "VIP" : getMajorityRegion(booth).region
        const existingRegion: Region | undefined = regions.find((region) => region.name == regionSection);

        if (existingRegion) {
            existingRegion.booths.push(booth)
        } else {
            const region: Region = {
                name: regionSection,
                booths: [booth]
            }
            regions.push(region)
        }
    })
    // organize regions in this order, default order for all regions not specifically mentioned: <unmatched regions>, "Pacific Northwest", "California", "Finger Lakes", "Midwest", "VIP"
    sortRegions(regions)

    console.log("regions", regions)
    return regions
}

export const groupDistributors = (buyers: Buyer[]): Distributor[] => {
    // receiving a complete list of buyers with carts, evaluate the distributors and their quantities and totals
    const distributors: Distributor[] = []
    const distributorEntries = new Map<string, {
        distributor: Distributor
        ordersByWineStoreAndPrice: Map<string, DistributorOrder>
    }>()

    buyers.forEach((buyer) => {
        Object.values(buyer.cart ?? {}).forEach((wine) => {
            const quantity = Number(wine.quantity)
            if (!Number.isFinite(quantity) || quantity <= 0) return

            const distributorName = wine["Distributor Name"]
            let distributorEntry = distributorEntries.get(distributorName)

            if (!distributorEntry) {
                const distributor: Distributor = {
                    name: distributorName,
                    orders: [],
                    destinations: []
                }
                distributorEntry = {
                    distributor,
                    ordersByWineStoreAndPrice: new Map()
                }
                distributorEntries.set(distributorName, distributorEntry)
                distributors.push(distributor)
            }

            distributorEntry.distributor.destinations.push({ buyer, wine, quantity })

            const orderKey = JSON.stringify([wine.Wine_ID, buyer.store, wine.Price])
            const existingOrder = distributorEntry.ordersByWineStoreAndPrice.get(orderKey)

            if (existingOrder) {
                existingOrder.quantity += quantity
                existingOrder.total += wine.Price * quantity
            } else {
                const order: DistributorOrder = {
                    winery: wine["Winery Name"],
                    variety: wine.Wine_Name,
                    price: wine.Price,
                    quantity,
                    total: wine.Price * quantity,
                    pickupLocation: buyer.store
                }
                distributorEntry.distributor.orders.push(order)
                distributorEntry.ordersByWineStoreAndPrice.set(orderKey, order)
            }
        })
    })

    return distributors
}

export const getFontSize = (numElements: number) => {
    // Calculate the output based on the derived equation
    const output = -2 * numElements + 28;

    // Define your clamp range
    const minValue = 10; // Adjust as needed
    const maxValue = 20; // Adjust as needed

    // Clamp the output
    return Math.max(minValue, Math.min(maxValue, output));
}

export const getMajorityRegion = (booth: Booth, key: keyof Wine = "Region"): { region: string, count: number } => {
    const regionCounts = new Map<string, number>()
    let majorityRegion: string | undefined
    let majorityCount = 0

    booth.bottles.forEach((bottle) => {
        const count = (regionCounts.get(String(bottle[key])) ?? 0) + 1
        regionCounts.set(String(bottle[key]), count)

        if (count > majorityCount) {
            majorityRegion = String(bottle[key])
            majorityCount = count
        }
    })

    if (majorityRegion === undefined) {
        return { region: String(booth.bottles[0][key]), count: 0 }
    }

    return { region: majorityRegion, count: majorityCount }
}

export const paginate = (e: KeyboardEvent, slice: Slice, setSlice: React.Dispatch<React.SetStateAction<Slice>>) => {
    if (e.key == 'ArrowRight') {
        setSlice(prev => ({
            start: prev.end,
            end: prev.end + 20
        }))
    } else if (e.key == 'ArrowLeft') {
        setSlice(prev => ({
            start: Math.max(0, prev.start - 20),
            end: prev.start
        }));
    } else if (e.key == "Enter") {
        save((slice), saveFormat.spreadsheet);
    }
};

export function assembleBuyerList(buyerActions: BuyerAction[]): Record<string, Buyer> {
    // calculates the carts of all buyers based on each buyer's actions that they submitted, such as selecting new wines or modifying the quantities in their cart
    console.log(buyerActions)
    const allBuyers: Record<string, Buyer> = {}
    for (let action of buyerActions) {
        const buyer = action.buyer
        if (!allBuyers[buyer.buyerId]) {
            allBuyers[buyer.buyerId] = buyer
            allBuyers[buyer.buyerId].cart = {};
        }
        console.log("Buyer:", buyer)

        let cart = allBuyers[buyer.buyerId].cart
        if (cart) {
            // check if it is a order that is valid and should be evaluated, then flatten the wines in the order to the buyer's collection of orders
            if (action.action == routes.orderWine) { // if route is for submitting a new order
                action = action as BuyerFormSubmit
                const selectedWines = action.order && action.order.selectedWines;
                for (const wine of selectedWines) {
                    const existingWine: Wine | undefined = cart[wine.Wine_ID]
                    if (existingWine) {
                        existingWine.quantity = Number(existingWine.quantity) + Number(wine.quantity);
                    } else {
                        cart[wine.Wine_ID] = wine
                    }
                }
            }
            if (action.action == routes.updateCart) { // if route is for revising an item (particularly quantity)
                // replace the existing wine with the new wine object, which should have the updated quantity
                action = action as UpdateCart
                if (action.updatedWine && action.updatedWine.Wine_ID) {
                    cart[action.updatedWine.Wine_ID] = action.updatedWine
                }
            }
        } else {
            console.log("Something fishy here worth investigating")
        }
    }
    console.log(allBuyers)
    return allBuyers
}