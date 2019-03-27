const https = require('https');

var GoogleHandler = function () {

    var key = [YOUR_API_KEY];
    var googlePlacesBasePath = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';

    var getPlaceWithQuery = function (queryParam) {
        var url = googlePlacesBasePath + "input=" + queryParam + '&inputtype=textquery' + '&fields=formatted_address,name' + "&key=" + key;
        console.log('Url: ', url);

        https.get(googlePlacesBasePath, (res) => {

            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log('PARSED DATA: ', parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        })
    }

    return {
        getPlaceWithQuery: getPlaceWithQuery
    }
}();


module.exports = GoogleHandler;