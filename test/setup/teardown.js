import {connectMongoDB} from "../../database/mongo.js";
import Countries from "../../models/Countries.js";
import config from "../test.config.js";

const teardown = async () => {
    console.log("Tearing down test data...");
    await connectMongoDB(config.mongoDBUri);
    await Countries.deleteMany({});
    console.log("Test data torn down.")
    process.exit(0);
};

teardown();