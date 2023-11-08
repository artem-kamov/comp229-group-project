const mongoose = require('mongoose');
let config = require('./config');

module.exports = function(){

    mongoose.connect(config.ATLASDB);

    let mongodb = mongoose.connection;

    mongodb.on('error', 
        console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log("Connection succesful");
    })

    return mongodb;

}