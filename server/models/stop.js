var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StopSchema = new Schema({
    "name" : String,
    "description" : String,
    "time" : Date,
    "location" : {type: Schema.Types.ObjectId, ref: 'Location'},
    "plan" : {type: Schema.Types.ObjectId, ref: 'Plan'}
})

var Stop = mongoose.model('Stop', StopSchema);
module.exports = Stop;