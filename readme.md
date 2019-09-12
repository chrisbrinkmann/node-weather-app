## Weather Forecast App - About

This app displays weather forecast data for almost any location on the planet.

### Design

This app was built using Node and Express. The views are rendered by the Express server with the Handlebars templating engine.

The forecast is generated using a combination of 2 API's -

1. Mapbox.com - Geocode API - translates the user input location (can be in any form... address, city, zip code, etc.) into latitude and longitude coordinates to be used by...

2. Darksky.net - Weather forecast API - returns the weather forecast data for a given latitude and longitude.


### Additional Features; not yet imlemented

1. Separate forecast for Current, Hourly, and Daily (similar to iOS weather App)

2. Icons corresponding to weather.