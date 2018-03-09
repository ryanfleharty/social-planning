var categoryController = require('../controllers/categoryController.js');
module.exports = function (app) {

    app.post('/categories/', function(req, res) {
        categoryController.create(req, res)
    })
    app.get('/categories/', function(req, res){
        categoryController.index(req, res)
    })

};