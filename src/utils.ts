import { Booth, Bottle, kinds, Region } from "./types";
//@ts-ignore
import html2pdf from 'html2pdf.js';

export const fetchWineData = async (): Promise<Bottle[]> => {
    try {
        const response = await fetch("https://script.google.com/a/macros/junglejims.com/s/AKfycbxQqq-6tKwuCZxbyXnGZAxGsx3o0WBc14tk-l1TZMjz0RfRu2V_GhqMYp85izuLUqiJdQ/exec");
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

export const groupBooths = (response: Bottle[]): Booth[] => {
    // take in the json response and return an object containing each section as an array of items in that section
    // Assuming your data is in an array of objects
    // Initialize an empty object to store the grouped data
    const booths: Booth[] = []

    // Loop through the data and group by the key
    response.forEach((bottle: Bottle) => {
        const boothNum: number = bottle["Booth #"]
        const existingBooth: Booth | undefined = booths.find((booth) => booth.number == boothNum);

        if (existingBooth) {
            existingBooth.bottles.push(bottle)
        } else {
            // If the section doesn't exist in the groupedData object, create it
            const booth: Booth = {
                name: bottle["Booth Name"],
                number: bottle["Booth #"],
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

export const groupRegions = (booths: Booth[]): Region[] => {
    const regions: Region[] = []

    booths.forEach((booth: Booth) => {
        const regionName: string = `${booth.number}`.includes("C") ? "VIP" : booth.bottles[0]['What country or region is this wine from?']
        const existingRegion: Region | undefined = regions.find((region) => region.name == regionName);

        if (existingRegion) {
            existingRegion.booths.push(booth)
        } else {
            const region: Region = {
                name: regionName,
                booths: [booth]
            }
            regions.push(region)
        }
    })
    // send Connoisseur to the back
    const vipIndex = regions.map(region => region.name).indexOf('VIP')
    const [vip] = regions.splice(vipIndex, 1)
    regions.push(vip)

    console.log("regions", regions)
    return regions
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

export const save = (slice: any) => {
    // save the pdf
    console.log("saving");

    const element = document.getElementById('all');

    const pdfOptions = {
        filename: `2025_booth-signs${slice.start}-${slice.end}`,
        image: { type: 'jpg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: [10, 36], orientation: "landscape" }
    };

    // Use the html2pdf function
    html2pdf().from(element).set(pdfOptions).save();
}