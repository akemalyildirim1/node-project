import {connectMongoDB} from "../../database/mongo.js";

import Countries from "../../models/Countries.js";
import config from "../test.config.js";

const setup = async () => {
    console.log("Setting up test data...");
    await connectMongoDB(config.mongoDBUri);

    const countries = [];

    for (const {region, count} of [{region: 'europe', count: 15}, {region: 'apac', count: 8}, {
        region: 'america',
        count: 45
    }]) {
        for (let i = 0; i < count; i++) {
            countries.push({name: `country${region}${i}`, region});
        }
    }

    await Countries.insertMany(
        countries
    );
    console.log("Test data set up.")
    process.exit(0);
};

setup();