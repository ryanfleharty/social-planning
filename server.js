var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

var googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyCTrnD1MkjL4LBmszx7Alt88hf5PtJf54w"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

app.get('/locations/:id', function(req, res){
    googleMapsClient.place({"placeid":req.params.id}, function(err, response){
        if(err){
            res.status(404).json(err)
        }
        res.render("placeDetail", {"place":response.json.result})
    })
})

app.post('/location_search', function(req, res){
    getLocation(req.body.city, function(response){
        getPlaces(req.body.query, response.lat, response.lng, function(response){
            res.json(response);
        })
    })
})
function getPlaces(query, lat, lng, callback){
    googleMapsClient.places({
            "query":query,
            "location":`${lat},${lng}`,
            "radius":500
    },
    function(err, response){
        if(!err){
            callback(response.json)
        }
        else{
            console.log(err)
        }
    })
}
function getLocation(city, callback){
    googleMapsClient.geocode({address: city},
        function(err, response){
            if(!err){
                callback(response.json.results[0].geometry.location);
            } else {
                console.log("PROBLEM CHIEF")
            }
        }
    )
}

app.listen(8000, function() {
 console.log("listening on port 8000");
});