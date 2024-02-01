import express from "express"
import axios from "axios"


export const calculateRepresentative = async (req: express.Request, res: express.Response) => {
    try {
        // Request to the countries endpoint to receive data (groupedBy set true)
        let data = (await axios.get("http://127.0.0.1:3000/countries?groupedBy=true")).data
        const MAX_REPS = 7
        const MIN_REPS = 3
        let newData = data.data.map((arr: any) => {
            // To find the max representatives number we have to use MIN_REPS as number
            let max = calculateReps(arr.count, MIN_REPS)
            // To find the min  representatives number we have to use MAX_REPS as number
            let min = calculateReps(arr.count, MAX_REPS)

            if (arr.count.length === 0) {
                // Each region has to have at least 1 representative even there is no country
                max = 1
                min = 1
            }
            return {
                region: arr._id,
                minSalesReq: min,
                maxSalesReq: max,
                total: arr.count
            }
        })
        res.status(200).json({
            message: "Successful",
            data: newData
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// Function to help calculate representatives
const calculateReps = (countriesLength: number, repLength: number) => {
    let count = 0
    const calculate = (leftLength: number) => {
        if (leftLength === 0) return
        if (leftLength > repLength) {
            leftLength -= repLength
            count += 1
            calculate(leftLength)
        } else {
            count += 1
        }
    }
    calculate(countriesLength)
    return count
}


