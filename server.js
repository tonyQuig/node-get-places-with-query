const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();
const util = require('util')
var googleHandler = require('./google-handler');



var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.listen(8000, () => {
    console.log('Server has started!');
});

app.use(cors(corsOptions));
app.use(getPlace);

app.route('/api/query/:query').get((req, res) => {
    var place = googleHandler.getPlaceWithQuery(req.params['query']);
    res.send(place);
})