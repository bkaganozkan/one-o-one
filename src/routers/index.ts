import express from "express"
import countries from "./countries"
import salesrep from "./salesrep"
import { checkDatabaseConnection } from "../middleware/database"
import { checkEndpoint } from "../middleware/error"


const router = express.Router()


export default (): express.Router => {

    // Check database connection status
    router.use(checkDatabaseConnection)
    // Countries Route
    countries(router)
    // Salesrep Route
    salesrep(router)
    // Optimal Route

    // 404 Page Not Found
    router.use(checkEndpoint)

    return router
}