const Listing = require("../models/listing.js");

// Index
module.exports.index = async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

// Render new form to create listing
module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs"); 
};

// Create new listing
module.exports.createListing = async (req, res, next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}; 
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// Show listing
module.exports.showListing = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    console.log(listing.reviews);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

// Edit listing
module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing})
};

// Update listing
module.exports.updateListing = async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}); 
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`); 
};

// Destroy listing
module.exports.destroyListing = async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted !");
    res.redirect("/listings");
}