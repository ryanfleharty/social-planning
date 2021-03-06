var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

var googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyCTrnD1MkjL4LBmszx7Alt88hf5PtJf54w"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(__dirname + '/front/dist'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
require('./server/config/mongoose');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);



app.get('/locations/:id', function(req, res){
    googleMapsClient.place({"placeid":req.params.id}, function(err, response){
        if(err){
            res.status(404).json(err)
        }
        console.log(response.json.result.opening_hours.periods);
        res.render("placeDetail", {"place":response.json.result})
    })
})

app.get('/places_search', function(req, res){
    console.log(req.query)
    getLocation(req.query.city, function(response){
        getPlaces(req.query.query, response.lat, response.lng, function(response){
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
            callback(response.json.results)
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
app.all("**", (request, response) => {
    console.log("PASSING THE BUCK TO ANGULAR")
    console.log(request.originalUrl)
    // response.sendFile(path.resolve("./front/dist/index.html")) 
});
app.listen(8000, function() {
 console.log("listening on port 8000");
});
