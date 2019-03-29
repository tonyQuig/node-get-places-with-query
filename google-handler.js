const https = require('https');
// Google maps client requires a valid places api key.
const googleMapsClient = require('@google/maps').createClient({
    key: [YOUR_API_KEY],
    Promise: Promise
});

var GoogleHandler = function () {

    var googlePlacesBasePath = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';

    var getPlaceWithQuery = async function (queryParam) {

        return new Promise(function (resolve, reject) {
            googleMapsClient.places({
                    query: queryParam
                }).asPromise()
                .then(function (response) {
                    console.log('Google result: ', response.json.results);
                    resolve(response.json.results);
                })
                .catch((err) => {
                    console.log('Error in google api request: ', err);
                });
        })
    }

    var getReviewsForAPlace = async function (placeId) {
        return new Promise(function(resolve, reject){
            googleMapsClient.place({
                placeid: placeId
            })
            .asPromise()
            .then(function(response) {
                console.log('Google place details result: ', response);
                resolve(response.json.result.reviews);
            })
        })
    }

    return {
        getPlaceWithQuery: getPlaceWithQuery,
        getReviewsForAPlace: getReviewsForAPlace
    }
}();


module.exports = GoogleHandler;