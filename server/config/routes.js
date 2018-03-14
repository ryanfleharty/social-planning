var categoryController = require('../controllers/categoryController.js');
const fs = require('fs');
const path = require('path');
const routesPath = path.join(__dirname, './routes')
module.exports = function (app) {
    fs.readdirSync(routesPath).forEach((file)=>{
        if(file.indexOf(".js") > -1){
            let routes = require(routesPath + "/" + file);
            routes(app);
        }
    })
};