const request = require('request')

/**
 * Makes a request to the Mapbox Geocode API
 * provide latitude, longitude... API returns weather info
 */
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/3edc660c7d94a449b1201cfd347588ad/${latitude},${longitude}?`
  
  request({ url, json: true }, (error, response, body) => {
    
    if (error) {
      // unable to connect to darksky API
      callback('Unable to connect to weather service!')

    } else if (response.statusCode === 403) {
      // bad API key provided
      callback('Access denied. Invalid API key.')

    } else if (body.error === "Poorly formatted request") {
      // Unable to find location for latitude/longitude provided
      callback('Unable to find location.')

    } else {
      // success, response from API rcvd; pass data back to callback
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature}${String.fromCharCode(176)}F. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
