import mongoose from "mongoose";

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true,
    }
})

export default mongoose.model("country", countrySchema);
