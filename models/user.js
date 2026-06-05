const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FIX: Destructure the module or handle it if it imports as an object
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    }
});

// If passportLocalMongoose is an object, we use its default export function, otherwise use it directly
if (typeof passportLocalMongoose === "function") {
    userSchema.plugin(passportLocalMongoose);
} else if (passportLocalMongoose && typeof passportLocalMongoose.default === "function") {
    userSchema.plugin(passportLocalMongoose.default);
} else {
    // This is the fallback syntax used in newer module versions
    userSchema.plugin(require("passport-local-mongoose"));
}

module.exports = mongoose.model("User", userSchema);