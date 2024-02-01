import mongoose from "mongoose"

// Connect to the Database and check is it established
export const connectToDatabase = () => {
    mongoose.Promise = Promise
    mongoose.connect(process.env.MONGODB_URL)
    mongoose.connection.on("error", (err: Error) => console.error(err))
    mongoose.connection.once('open', () => {
        console.log("Database connection established");
    })
}
