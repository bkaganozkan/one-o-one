import express from "express"
import { getCountriesFromDB } from "../db/countries"

export const getCountries = async (req: express.Request, res: express.Response) => {
    try {
        const query = req.query;
        // Retrieve specific region countries

        if (query.hasOwnProperty("region")) {
            try {
                const region = query.region as string
                const countries = await getCountriesFromDB(region)
                if (!countries.length) {
                    res.status(404).json({ message: "Region not found" })
                    return
                }
                res.status(200).json({
                    message: "Successful",
                    length: countries.length,
                    data: countries
                })
            } catch (error) {
                res.status(400).json({
                    message: "Bad request"
                })
            }
        }
        else if (query.hasOwnProperty("groupedBy")) {
            try {
                // capture as boolean
                const groupedBy = !!query.groupedBy
                const groupedCountries = await getCountriesFromDB("", groupedBy)
                res.status(200).json({
                    message: 'Successful',
                    data: groupedCountries
                })
            } catch (error) {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
        else {
            // If there is no query use retrieve all countries
            const countries = await getCountriesFromDB()
            if (!countries.length) {
                res.status(200).json({
                    message: "There is no country.",
                    length: 0
                })
                return
            }

            res.status(200).json({
                message: "Successful",
                length: countries.length,
                data: countries
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

