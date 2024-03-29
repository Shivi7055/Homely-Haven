const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn} = require("../middleware.js");
const reviewController = require("../Controllers/reviews.js");
 
// Reviews 
// Post route
router
    .route("/")
    .post(isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

// Delete route
router
    .route("/:reviewId")
    .delete(wrapAsync(reviewController.destroyReview));  

module.exports = router;