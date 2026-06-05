const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const wrapAsync = require("./utils/wrapAsync.js");

// Authentication Packages
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Database Models
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

// MongoDB Connection
main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Standard Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 1. Session Configuration Options
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));

// 2. Passport Middleware Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());   
passport.deserializeUser(User.deserializeUser()); 

// 3. Custom Middleware for Global Variables
app.use((req, res, next) => {
    res.locals.currUser = req.user; 
    next();
});


// ################### ROUTES ###################

// ======= LANDING GATEWAY ROUTE =======
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// ================== USER ROUTES ==================

// Render Signup Form
app.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// Handle Signup Logic (Wrapped with try-catch to custom handle Passport validation errors)
app.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.redirect("/listings"); 
        });
    } catch (e) {
        console.log(e.message);
        res.redirect("/signup");
    }
}));

// Render Login Form
app.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// Handle Login Logic using Passport Middleware
app.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: false
    }),
    (req, res) => {
        res.redirect("/listings");
    }
);

// Handle Logout Logic
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/"); 
    });
});


// ================== LISTING ROUTES ==================

//############ Index Route ################
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//####### New Route #############
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//########### Show Route ################
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//####### Create New Route #############
app.post("/listings", wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");  
}));

//######### Edit Route #########
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

//########### Update Route #############
app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//########### Delete Route #############
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


// ################### ERROR HANDLING ###################

// Custom Express Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("--- ERROR ENCOUNTERED ---");
    console.error(err.stack); 
    console.error("-------------------------");
    
    res.status(500).send("Something went wrong!");
});


// ################### SERVER START ###################
app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});