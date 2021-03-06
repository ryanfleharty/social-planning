const Category = require('mongoose').model('Category')

module.exports = {
    index(req, res){
        Category.find()
            .then((categories)=>{
                res.json(categories);
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    show(req, res){
        Category.findById(req.params.id)
            .then((category)=>{
                res.json(category);
            })
            .catch(function(err){
                res.status(422).json(err);
            })
    },
    create(req, res){ //really a findOrCreate...
        console.log(req.body);
        Category.findOne({"name":req.body.name})
        .then((category)=>{
            if(!category){
                console.log(`couldn't find ${req.body.name}`);
                Category.create(
                    { "name" : req.body.name }
                )
                .then((newCategory)=>{
                    res.json(newCategory);
                })
                .catch(function(err){
                    res.status(422).json(err);
                })
            }
            else {
                res.json(category)
            }
        })
        .catch((err)=>{
            res.status(422).json(err);
        })
    }
}