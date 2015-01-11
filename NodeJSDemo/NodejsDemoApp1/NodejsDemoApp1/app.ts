﻿console.log('Hello world');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pois');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connected to MongoDB');
});




/*

insert poi from mergeresult_final



var Poi = mongoose.model('POI', poiSchema); 
fs.readFile('./datas/mergeresult_final.json', function (err, data) {
    if (err)
        throw err;

    var jsonObj = JSON.parse(data);
    var space = ' ';
    var newLine = ' . ';
    var chunks = [];
    var length = 0;

    for (var i = 0; i < jsonObj.length ; i++) {
        var item = jsonObj[i];
        var poiItem = new Poi({
            poiid: item['poiid'],
            title: item['title'],
            lon: item['lon'],
            lat: item['lat'],
            category: item['category'],
            category_name: item['category_name'],
            address: item['address']
        })
        poiItem.save(function (err, poiItem) {
            if (err) return console.error(err);
            poiItem.print();
        });
    }
});

*/
