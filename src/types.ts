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


export type Wine = {
    Created_Time: string,
    Modified_Time: string,
    "Booth #": number,
    Booth_ID: string,
    Booth_Name: string,
    "Distributor Name": string,
    "Winery Name": string,
    Wine_Name: string,
    Subregion: string,
    Country: string,
    Region: string,
    Custom_Region: string,
    Price: number,
    Wine_ID: string,
    Staff_Pick: string,
    Is_VIP: string,
    Submitter_Email: string,

    Exclude?: boolean
    quantity?: number | string
}

export type Booth = {
    name: string
    number: string
    ID: string
    bottles: Wine[]
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



export type Distributor = {
    name: string
    orders: DistributorOrder[]
    destinations: VendorDestination[]
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


export type VendorDestination = {
    // contains the wine data and quantity of a single wine that needs to be dropped off at a single buyers booth
    buyer: Buyer
    distributor?: Distributor
    wine: Wine
    quantity: number
}



export type Buyer = {
    name: string;
    buyerId: string;
    store: string;
    email: string;
    phone: string;
    cart?: Record<string, Wine>
}

export type BuyerFormSubmit = {
    action: "buyerFormSubmit";
    order: {
        boothNum: string;
        selectedWines: Wine[];
    };
    buyer: Buyer;
};

export type UpdateCart = {
    action: "updateCart";
    updatedWine: Wine;
    buyer: Buyer;
};

export type BuyerAction = BuyerFormSubmit | UpdateCart

export type BuyerActionPayload = {
    body: BuyerAction
};

const payload: BuyerActionPayload = {
    body: {
        action: "buyerFormSubmit",
        order: {
            boothNum: "50",
            selectedWines: [
                {
                    "Created_Time": "2026-10-02T21:03:52.713Z",
                    "Modified_Time": "2026-10-02T21:04:19.759Z",
                    "Booth #": 50,
                    "Booth_Name": "St. Julian",
                    "Wine_Name": "Sugar Cookie",
                    "Price": 10.99,
                    "Staff_Pick": "",
                    "Region": "Midwest",
                    "Country": "Michigan",
                    "Subregion": "Michigan",
                    "Is_VIP": "No",
                    "Wine_ID": "264dc819-c7de-490b-9c25-06139493424e",
                    "Submitter_Email": "rene.szymanski@stjulian.com",
                    "Distributor Name": "SGWS",
                    "Winery Name": "St Julian",
                    "Booth_ID": "1e552ced-b39f-41cc-be97-dd16f7108085",
                    "Custom_Region": "",
                    Exclude: false,
                    quantity: "1",
                },
            ],
        },
        buyer: {
            name: "Aaron Greider",
            buyerId: "aar-gre-737",
            store: "Eastgate",
            email: "aaron.greider@gmail.com",
            phone: "9377167737",
        },
    },
};

export type RawRecord = {
    Date_Recieved: string;
    Data: string;
};

export const routes = {
    registerWine: "formSubmit",
    getBoothByNum: "getBoothByNum",
    orderWine: "buyerFormSubmit",
    viewCart: "viewCart",
    updateCart: "updateCart",
    getBuyers: "getBuyers"
}