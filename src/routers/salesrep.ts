import express from "express"

import { calculateRepresentative } from "../controllers/salesrep"

export default (router: express.Router) => {
    router.get("/salesrep", calculateRepresentative)
}