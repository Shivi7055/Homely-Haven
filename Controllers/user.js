const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) =>{
    res.render("user/signup.ejs");
};

module.exports.signup = async (req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Homely Haven");
            res.redirect("/listings");
        });
    } catch(e){
        console.log("Some error occured". e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("user/login.ejs");
};

module.exports.login = async (req, res) =>{
    req.flash("success", "Welcome back to Homely Haven!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};