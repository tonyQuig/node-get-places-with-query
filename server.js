const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();
const util = require('util')
var googleHandler = require('./google-handler');
// var Promise = require('promise');



var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.listen(8000, () => {
    console.log('Server has started!');
});

app.use(cors(corsOptions));

app.route('/api/query/:query').get(async function(req, res) {
    var location = await googleHandler.getPlaceWithQuery(req.params['query']);
    console.log('Location: ', await location);
    res.json(location);
})

app.route('/api/query/details/:query').get(async function(req, res) {
    var locationDetails = await googleHandler.getReviewsForAPlace(req.params['query']);
    console.log('locationDetails: ', await locationDetails);
    res.json(locationDetails);
})