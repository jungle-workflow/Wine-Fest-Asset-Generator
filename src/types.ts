export type Bottle = {
    Created_Time: string,
    "Booth #": number,
    "Distributor Name": string,
    "Winery Name": string,
    Booth_Name: string,
    Wine_Name: string,
    Subregion: string,
    Country: string,
    Region: string,
    Custom_Region: string,
    Price: number,
    Wine_ID: string,
    Is_VIP: string,
    Submitter_Email: string,
    Exclude: boolean
}

export type Booth = {
    name: string
    number: string
    ID: string
    bottles: Bottle[]
    advImg?: string
    kind: string
}

export type Region = {
    name: string
    booths: Booth[]
}

export const kinds = {
    booth: 'booth',
    ad: 'ad',
    empty: 'empty',
}

export type Advertisement = {
    src: string
    isHalf: boolean
    kind: string
    index: number
}

export type BuyerOrder = {
    "Timestamp": string
    "Buyer's Club #": string
    "Wine ID": number
    "Quantity": number
    "Booth": number
    "Err?": number
    "First / Last": string
    "Variety": string
    "Winery": string
    "Distributor": string
    "Wine Price": number
    "Total": number
    "Transaction ID": number
    "Pickup Location": string
    "Phone": string
    "Email": string
}

export type Buyer = {
    "Buyer's Club Number": string
    "Buyer name": string
    "Phone": string
    "Email": string
    "Pickup Location": string
    orders: BuyerOrder[]
}

export type Distributor = {
    name: string
    buyerOrders: BuyerOrder[]
    distributorOrders: DistributorOrder[]
    contact?: string
    phone?: string
    email?: string
}

export type DistributorOrder = {
    winery: string
    variety: string
    price: number
    quantity: number
    total: number
    pickupLocation: string
}

export type Slice = {
    start: number,
    end: number
}

export const saveFormat = {
    banner: "banner",
    clipboard: "clipboard",
    guide: "guide",
    slips: "slips",
    spreadsheet: "spreadsheet",
}