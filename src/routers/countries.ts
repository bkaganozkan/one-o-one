import express from "express"

import { getCountries } from "../controllers/countries"

export default (router: express.Router) => {
    router.get("/countries", getCountries)
}