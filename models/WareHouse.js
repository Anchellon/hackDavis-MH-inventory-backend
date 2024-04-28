const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const WareHouseSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    inStock: {
        type: Number,
        required: true,
        // validate: [
        //     function (value) {
        //         return value <= this.options.length;
        //     },
        // ],
    },
    requiredMore: {
        type: Number,
        required: true,
        validate: [
            function (value) {
                return value <= 0;
            },
        ],
    },
});
WareHouseSchema.plugin(timestampPlugin);
module.exports = mongoose.model("WareHouse", WareHouseSchema);
