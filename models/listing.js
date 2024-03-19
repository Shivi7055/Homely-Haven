const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

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
    country : String,
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }]
})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;