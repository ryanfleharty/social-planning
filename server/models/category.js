var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    "name" : String,
})

var Category = mongoose.Model('Category', CategorySchema);
module.exports = Category;