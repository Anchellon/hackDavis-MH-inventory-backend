const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    item: { type: String, required: true },
    category: { type: String, required: true },
    quantity: {
        type: Number,
        required: true,
        // validate: [
        //     function (value) {
        //         return value <= this.options.length;
        //     },
        // ],
    },
    donatedBy: { type: String, required: true },
});
TransactionSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Transaction", TransactionSchema);
