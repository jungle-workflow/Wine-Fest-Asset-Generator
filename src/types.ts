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