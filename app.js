import dotenv from 'dotenv';
import express from 'express';

import {connectMongoDB} from "./database/mongo.js";
import countryRouter from "./routes/countries-routes.js";
import salesrepRouter from "./routes/salesrep-routes.js";
import optimalRouter from "./routes/optimal-routes.js";

dotenv.config();

export const app = express();

app.use(express.json());
app.use("/countries", countryRouter);
app.use("/salesrep", salesrepRouter);
app.use("/optimal", optimalRouter);

const mongoURI = process.env.MONGO_URI;

connectMongoDB(
    mongoURI
).then(() => {
        app.listen(3000, () => {
                console.log("Server is running on port 3000");
            }
        )
    }
).catch((err) => {
        console.log(err)
        console.log("Connection failed");
    }
)

