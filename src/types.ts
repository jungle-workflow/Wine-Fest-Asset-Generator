export type Bottle = {
    "Timestamp": string,
    "Booth #": number,
    "Distributor Name": string,
    "Winery Name": string,
    "Booth Name": string,
    "Wine Name / Type": string,
    "What country or region is this wine from?": string,
    "Wine Price": number,
    "Wine ID": string,
    "Is this a connoisseur/VIP wine?": string,
    "New Distributor Name": string,
    "New Winery Name": string,
    "If your booth name is not on the list above, enter a new one below. This name will be what is displayed on your booth at the festival.": string,
    "My distributor is not on the list above. I'd like to enter a new distributor": string,
    "My winery is not on the list above. I'd like to enter a new winery": string,
    "Distributor Phone #": string,
    "Distributor Email": string,
    "Winery Phone #": string | number,
    "Winery Email": string,
    "Email Address": string,
    "Continue?": string,
}

export const kinds = {
    booth: 'booth',
    ad: 'ad',
}

export type Booth = {
    name: string
    number: string | number
    bottles: Bottle[]
    advImg?: string
    kind: string
}

export type Region = {
    name: string
    booths: Booth[]
}

export type Advertisement = {
    src: string
    isHalf: boolean
    kind: string
}

export const advertisements: Advertisement[] = [
       
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/BNE-Jungle-Jim-Ad.jpg",
        isHalf: false,
        kind: kinds.ad
    },
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/bzl_ad_winefest_0925r2_final_HR.jpg",
        isHalf: false,
        kind: kinds.ad
    },     {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/CSM-Artwork.jpg",
        isHalf: true,
        kind: kinds.ad
    },
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/Ole-Ad.jpg",
        isHalf: true,
        kind: kinds.ad
    },
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/ttg_ad_winefest.jpg",
        isHalf: true,
        kind: kinds.ad
    },
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/2019-Cab-MK.jpg",
        isHalf: true,
        kind: kinds.ad
    },
    {
        src: "./src/assets/2025_Vendor_Ads/BW-cropped/MVS-SM-Ad.jpg",
        isHalf: false,
        kind: kinds.ad
    },


]
