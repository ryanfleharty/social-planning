var mongoose = require('mongoose');
var User = mongoose.model("User");
var userController = require("../../controllers/userController.js");

module.exports = function (app) {
    //auth routes
    app.route('/register')
        .post(userController.register)
    app.route('/login')
        .post(userController.login)
    app.route('/session')
        .get(userController.checkSession)
    app.route('/logout')
        .get(userController.logout)

    //user routes
    app.route('/user/:id')
        .get(userController.getUser)
        .post()
        .put()
        .delete()

}