import mongoose from "mongoose";

export const getCountriesFromDB = async (region: string = "", grouped: boolean = false) => {
    // If Database not connected It gives an error
    if (mongoose.connection.readyState !== 1) console.error("Database Not connected")
    // Otherwise move forward
    else {
        const collection = mongoose.connection.db.collection("countries")
        // We could use to group them to calculate easily  
        if (grouped) {
            let groupedCountries = await collection.aggregate([
                {
                    $group: {
                        // Group them with lowercase region APAC-Apac-apac => apac
                    _id: { $toLower: '$region' },
                        count: { $sum: 1 },
                        countries: { $push: '$name' }
                    }
                }
            ]).toArray()
            return groupedCountries
        }
        else if (!region.length) {
            const countries = await collection.find().toArray()
            return countries
        } else {
            // To fix the upper-lower case sensitive I used the regular expression
            const caseInsensitiveRegionQuery = new RegExp(`^${region}$`, 'i');
            const countries = (await collection.find({ region: caseInsensitiveRegionQuery }).toArray())
            return countries
        }
    }
}
