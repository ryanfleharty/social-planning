const Plan = require('mongoose').model('Plan')

module.exports = {
    index(req, res){
        Plan.find()
            .then((plans)=>{
                res.json(plans);
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    show(req, res){
        Plan.findById(req.params.id)
            .then((plan)=>{
                res.json(plan)
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    create(req, res){
        Plan.create({
            "title": req.body.title,
            "date": req.body.date,
        })
        .then((plan)=>{
            res.json(plan)
        })
        .catch((err)=>{
            res.status(422).json(err);
        })
    }
}