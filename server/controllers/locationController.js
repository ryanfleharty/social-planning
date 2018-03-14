const Location = require('mongoose').model('Location')

module.exports = {
    index(req, res){
        Location.find()
            .then((locations)=>{
                res.json(locations);
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    show(req, res){
        Location.findById(req.params.id)
            .then((location)=>{
                res.json(location);
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    create(req, res){ 
        console.log(req.body);
        Location.findOne({"google_placeid":req.body.google_placeid})
        .then((location)=>{
            if(!location){
                console.log(`couldn't find ${req.body.name}`);
                Location.create({ 
                    "name" : req.body.name,
                    "google_placeid": req.body.google_placeid
                })
                .then((newLocation)=>{
                    res.json(newLocation);
                })
                .catch(function(err){
                    res.status(422).json(err);
                })
            }
            else {
                res.json(location)
            }
        })
        .catch((err)=>{
            res.status(422).json(err);
        })
    }
}