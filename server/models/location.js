var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    "name" : String,
    "description" : String,
    "google_rating" : Number,
    "google_place_id" : Number,
    "categories" : [{ type: Schema.Types.ObjectId, ref: "Category"}]
})

var Location = mongoose.model('Location', LocationSchema)
module.exports = Location;