const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required"]
    },
    description: {
        type: String,
        required: [true, "The description field is required"],
    },
    price: {
        type: String,
        required: [true, "The price field is required"]
    },
    variants: [{
        name            : String,
        sku             : String,
        additional_cost : Number,
        stock_count     : Number,
    }],
}, { timestamps: true });


const Product = mongoose.model("products", ProductSchema);
module.exports = Product;