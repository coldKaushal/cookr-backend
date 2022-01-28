require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Cookr");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userInfoSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    address1: String,
    address2: String,
    postalcode: String,
    mobile: String,
    country: String,
    state: String
});


userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("Credential", userSchema);
const UserInfo = new mongoose.model("Information", userInfoSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


app.get("/", function (req, res) {
    console.log(req);
    if (req.isAuthenticated()) {
        console.log("Already logged in");
        res.status(200);
        res.send("Already logged in");
    } else {
        console.log("Not logged in");
        res.status(502);
        res.send("not logged in");

    }
});

app.post("/getProfile", function (req, res) {
    const userName = req.body.username;
    console.log(userName);
    try {
        User.findOne({ username: userName }, function (err, userid) {
            if (err) {
                res.status(404);
                res.send("User not found");
            } else {
                console.log(userid);
                UserInfo.findOne({ 'username': userName }, function (err, foundUser) {
                    if (err) {
                        console.log(err);
                        
                    } else {
                        if(foundUser==null){
                            const emptyUser = {
                                fname: "",
                                lname: "",
                                username: userName,
                                address1: "",
                                address2: "",
                                postalcode: "",
                                mobile: "",
                                country: "",
                                state: ""
                            }
                            res.status(200);
                            res.send(emptyUser);
                        }else{
                            res.status(200);
                            res.send(foundUser);
                        }
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
})


app.post("/logout", function (req, res) {
    try {
        req.logout();
        res.status(200);
        console.log("logged out");
        res.send("successfully logged out");
    } catch (error) {
        res.status(502);
        res.send(error)
    }
})


app.post("/profile", function (req, res) {
    try {
        const userDetail = req.body;
        console.log(userDetail);
        const newUser = new UserInfo({
            fname: userDetail.fname,
            lname: userDetail.lname,
            username: userDetail.username,
            address1: userDetail.address1,
            address2: userDetail.address2,
            postalcode: userDetail.postalcode,
            mobile: userDetail.mobile,
            country: userDetail.country,
            state: userDetail.state
        });
        UserInfo.findOne({username: userDetail.username}, function(err, foundUser){
            if(err){
                console.log(err);
                res.status(502);
            }else{
                if(foundUser==null){
                    res.status(200);
                    newUser.save(function(err){
                        if(err){
                            console.log(err);
                            res.status(502);
                        }else{
                            res.status(200);
                            console.log("Success");
                        }
                        
                    });
                }else{
                    UserInfo.deleteOne({username: foundUser.username}, function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Suces");
                        }
                    });
                    newUser.save();
                    res.status(200);
                    res.send("Success");
                    console.log("sucess");
                }
            }
        })

    } catch (error) {
        res.status(502);
        res.send(error);
    }
})


app.post("/login", function (req, res) {
    //console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    //console.log(req.body);
    //console.log(user);
    req.login(user, function (err) {
        if (err) {
            res.status(502);
            res.send(err);
        } else {
            let a = 0;
            passport.authenticate("local")(req, res, function () {
                a = 1;
                console.log("Successfully logged in");
                res.send(JSON.stringify({ "status": 200, "error": null }));
            })
            console.log(a);
        }
    })
});


app.post("/signup", function (req, res) {
    //console.log(req.body);


    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            //console.log(err);
            res.status(502);
            res.send(err);
        } else {
            let a = 0;
            passport.authenticate("local")(req, res, function () {
                a = 1;
                console.log("Successfully logged in");
                res.send(JSON.stringify({ "status": 200, "error": null }));
            })
            console.log(a);
        }
    })
});



app.listen(4000, function () {
    console.log("Server started at port 4000");
})