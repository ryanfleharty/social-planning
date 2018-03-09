var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanSchema = new Schema({
    title: String,
    date: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: 'User'},
    joiners: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    stops: [{ type: Schema.Types.ObjectId, ref: 'Stop'}]
})

var Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;