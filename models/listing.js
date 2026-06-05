const mongoose = require("mongoose");

// schema
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },

        url: {
            type: String,
            default:
                "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=2820&auto=format&fit=crop",
        },
    },

    price: Number,
    location: String,
    country: String,
});

// model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;