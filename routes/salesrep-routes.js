import express from "express";
import axios from "axios";

import {getSalesRepresentativeCount} from "../controllers/salesrep-controller.js";

const salesrepRouter = express.Router();

salesrepRouter.get("/", async (req, res) => {
    // Find the protocol and host to send a new request to the
    // current application.
    const protocol = req.protocol;
    const host = req.get('host');
    const apiURL = `${protocol}://${host}/countries`;

    // Get all countries.
    const requestResponse = await axios.get(apiURL);
    const countries = requestResponse.data;

    const salesRepresentativeCount = getSalesRepresentativeCount({countries});

    return res.status(200).json(salesRepresentativeCount);
});

export default salesrepRouter;