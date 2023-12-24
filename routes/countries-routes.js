import express from "express";

import {getAllCountries} from "../controllers/countries-controller.js";

const countriesRouter = express.Router();

countriesRouter.get("/", async (req, res) => {
    // Parse region.
    const region = req.query.region;

    let countries;
    try {
        countries = await getAllCountries({region});
    } catch (err) {
        // If there is no country for the selected region, return 404.
        return res.status(404).json({message: err.message});
    }

    return res.status(200).json(countries);
});

export default countriesRouter;