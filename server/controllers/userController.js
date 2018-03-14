var mongoose = require("mongoose");
var bcrypt = require("bcrypt-as-promised");
var session = require('express-session');
var User = mongoose.model("User");

module.exports = {
    register: function (req, res) {
        var regErrors = [];

        if (req.body.confirmPassword === null) {
            regErrors.push({ message: "Please enter a confirmation password" });
        }
        if (req.body.password !== req.body.confirmPassword) {
            regErrors.push({ message: "Passwords must match!" });
        }

        if (regErrors.length !== 0) {
            res.send(regErrors);
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            newUser.save(function (err) {
                if (err) {
                    res.send(newUser.errors);
                } else {
                    req.session.userId = newUser._id;
                    res.send({ user: newUser, message: "success" })
                }
            })
        }
    },
    login: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                res.send(err)
            } else if (user === null) {
                res.send({ message: "Email is not in our database" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(function (loggedIn) {
                        req.session.userId = user._id;
                        console.log(req.session.userId);
                        res.send({ message: "success", user: user });
                    })
                    .catch(function (loginError) {
                        console.log("line 53")
                        res.send({ message: "Email is not in our database" })
                    });
            }
        });
    },
    checkSession: function (req, res) {
        if (req.session.userId) {
            res.send({ status: true, userId: req.session.userId })
        } else {
            res.send({ status: false })
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        res.send({ status: true });
    },
    getUser: function (req, res) {
        User.findById(req.params.id)
            .sort({ createdAt: -1 })
            .exec(function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
    }
}