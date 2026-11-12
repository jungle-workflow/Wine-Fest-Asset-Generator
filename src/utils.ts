import { Booth, Bottle, Buyer, BuyerOrder, Distributor, DistributorOrder, saveFormat, kinds, Region, Slice } from "./types";
import html2pdf from 'html2pdf.js';

export const fetchWineData = async (): Promise<Bottle[]> => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbz4yrN6sQF9b1foeOmfD_5lvrrghd0MAqXRwcsy-Bv-l12XdChOGnbIzMwkVV2YHMFcRA/exec");
        //const response = await fetch("/src/assets/data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const bottleData = data.data
        console.log(bottleData);

        return bottleData as Bottle[]
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Ensure the error is propagated if necessary 
    }
}

export const fetchOrderData = async (): Promise<BuyerOrder[]> => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzX0BP7m5JaJvgW7C6jWwaaPSfqeKjvcZOVFZSkqZYPqzOQJcyk2iCm8kwZtdtqbTy6/exec");
        //const response = await fetch("/src/assets/data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const orderData = data.data
        console.log(orderData);

        return orderData as BuyerOrder[]
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

export const groupBooths = (response: Bottle[]): Booth[] => {
    // take in the json response and return an object containing each section as an array of items in that section
    // Assuming your data is in an array of objects
    // Initialize an empty object to store the grouped data
    const booths: Booth[] = []

    // Loop through the data and group by the key
    response.forEach((bottle: Bottle) => {
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

export const groupOrders = (response: BuyerOrder[]): Buyer[] => {
    // take in the json response and return an object containing each section as an array of items in that section
    // Assuming your data is in an array of objects
    // Initialize an empty object to store the grouped data
    const buyers: Buyer[] = []

    // Loop through the data and group by the key
    response.forEach((order: BuyerOrder) => {
        const orderBuyerNum: string = order["Buyer's Club #"]
        const existingBuyer: Buyer | undefined = buyers.find((buyer) => buyer["Buyer's Club Number"] == orderBuyerNum);

        if (existingBuyer) {
            existingBuyer.orders.push(order)
        } else {
            // If the section doesn't exist in the groupedData object, create it
            const buyer: Buyer = {
                "Buyer's Club Number": orderBuyerNum,
                "Buyer name": order["First / Last"],
                "Phone": order.Phone,
                "Email": order.Email,
                "Pickup Location": order["Pickup Location"],
                orders: [order]
            }
            buyers.push(buyer)
        }
    });
    const sortedbuyers = buyers.sort((a, b) => a["Buyer name"].localeCompare(b["Buyer name"]))
    return sortedbuyers
}

export const groupDistributors = (response: BuyerOrder[]): Distributor[] => {
    const distributors: Distributor[] = []

    // Loop through the data and group by the key
    response.forEach((order: BuyerOrder) => {
        const distName: string = order.Distributor
        const existingDist: Distributor | undefined = distributors.find((distributor) => distributor.name == distName);

        if (existingDist) {
            existingDist.buyerOrders.push(order)
            existingDist.buyerOrders.sort((a, b) => a["First / Last"].localeCompare(b["First / Last"]))
            // get the existing distributor order in distributor orders

            const existingDorder: DistributorOrder | undefined = existingDist.distributorOrders.find((dorder) => dorder.variety == order.Variety && dorder.pickupLocation == order["Pickup Location"])
            if (existingDorder) {
                // if found, add quantity to existing quantity and recalulate total
                existingDorder.quantity += order.Quantity
                existingDorder.total += order.Total
            } else {
                // if not found, append new order
                existingDist.distributorOrders.push({
                    winery: order.Winery,
                    variety: order.Variety,
                    price: order["Wine Price"],
                    quantity: order.Quantity,
                    total: order.Total,
                    pickupLocation: order["Pickup Location"]
                })
            }
        } else {
            // If the section doesn't exist in the groupedData object, create it
            const distributor: Distributor = {
                name: distName,
                buyerOrders: [order],
                distributorOrders: [{
                    winery: order.Winery,
                    variety: order.Variety,
                    price: order["Wine Price"],
                    quantity: order.Quantity,
                    total: order.Total,
                    pickupLocation: order["Pickup Location"]
                }]
            }
            distributors.push(distributor)
        }
    });
    console.log('distributors', distributors);

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

export const getMajorityRegion = (booth: Booth, key: keyof Bottle = "Region"): { region: string, count: number } => {
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