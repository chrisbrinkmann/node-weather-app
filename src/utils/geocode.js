const request = require("request")

/**
 * make a request to the mapbox geocode API
 * provide location name, API returns latitude and longitude
 */
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${process.env.GEOCODE_ACCESS_TOKEN}`

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      // unable to connect to API
      callback("Unable to connect to geocoding location service!")

    } else if (response.statusCode === 401) {
      // bad API key provided
      callback("Not Authorized - Invalid Token")

    } else if (body.features.length === 0) {
      // no matches for location provided
      callback("Unable to find location!")

    } else {
      // success, response from API rcvd; pass data back to callback
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
