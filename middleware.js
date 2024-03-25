const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js"); 
const {reviewSchema} = require("./schema.js");

const isLoggedIn = (req, res, next) =>{ 
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to do this!"); 
        return res.redirect("/login");
    }
    next();
}

const saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id); 
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("success", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}

const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};

const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};

module.exports = {
    isLoggedIn : isLoggedIn,
    saveRedirectUrl : saveRedirectUrl,
    isOwner : isOwner,
    validateListing : validateListing,
    validateReview : validateReview
};
