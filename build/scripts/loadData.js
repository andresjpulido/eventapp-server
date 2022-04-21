"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var mongoose = require('mongoose');
var _ = require('lodash');
var events = require('./events.json');
var users = require('./users.json');
var countries = require('./countries.json');
const models_1 = require("../src/db/models");
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// once the connection is established we define our schemas
db.once('open', function callback() {
    models_1.userModel.find().remove();
});
/*
exports.reset = function( req, res ) {

    // get refs to the models we defined above
    var Users = mongoose.model( 'User' );
    var LogEntry = mongoose.model( 'LogEntry' );

    // clear all existing documents from the collections
    Food.find().remove();
    LogEntry.find().remove();

    // populate the foods collection from json data
    // nothing fancy here as Food documents do not reference anything else
    for( var i = 0; i < foodData.length; i++ ) {
        new Food( foodData[ i ] ).save();
    }

    // now that the collection is populated we iterate over it
    Food.find( function( err, foods ) {
        var foodMap = {};

        // store _ids of Food documents that Mongo generated upon insert
        for( var i = 0; i < foods.length; i++ ) {
            var food = foods[i];
            // I am mapping the ids to the food names because the LogEntry
            // JSON data contained this field thanks to the original source
            // data's structure (a spreadsheet).
            // You could utilize a more sophisticated lookup here if necessary.
            foodMap[ food.name ] = food._id;
        }

        // populate the LogEntries collection from json data
        for( i = 0; i < logData.length; i++ ) {
            var logEntry = logData[ i ];
            // we find and store food._id on LogEntry for reference
            logEntry._food = foodMap[ logEntry.food_name ];

            // note that only the fields defined in the schema will be
            // persisted to Mongo, so the foodName field we used for
            // lookup will not be unnecessarily added to the db
            new LogEntry( logEntry ).save();
        }
    } );

    res.redirect( "/" );
};
*/ 
//# sourceMappingURL=loadData.js.map