const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
        type : String, 
        required : true
    },
    description : String,
    image : {
        filename : {
            type: String,
            default: "filename"
        },
        url : {
            type : String,
            default : "https://unsplash.com/photos/a-path-through-a-dense-forest-on-a-foggy-day-cJc10ctjwnw",
            set : (v) => v === "" ? "https://unsplash.com/photos/a-path-through-a-dense-forest-on-a-foggy-day-cJc10ctjwnw" : v
        }
    }, 
    price : Number,
    location  : String,
    country : String
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;