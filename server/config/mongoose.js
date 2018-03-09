const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost/spt_db');

const models_path = path.join(__dirname, './../models');
mongoose.connection.on('connected', ()=>console.log('connected to mongo!'));

fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
    }
})