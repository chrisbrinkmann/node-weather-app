const path = require('path') // core module for filesys paths
const express = require('express')
const hbs = require('hbs') 
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../.env')})
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// define paths for express config
// __dirname = absolute path to current script dir; provided by node
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and paths for templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// .use runs middleware (auxiliary functions)
// .static takes an arg of the path to the folder where we serve static assets from
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // because we used .set to set the app view engine to hbs,
  // we can res.render pages from / views
  // arg1 is the name of the file(view) to render
  // arg2 is an object with any data we want to pass
  res.render('index', {
    title: 'Weather App',
    name: 'Chris Brinkmann'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Chris Brinkmann'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Chris Brinkmann',
    helpMsg: `Try spinning, that's a good trick!`
  })
})

// route for geocode and forecast API requests
// requires an address query string value
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  // make a request to the mapbox geocode API
  // provide location name, API returns latitude and longitude
  // set default empty object in case of invalid request query
  // (prevents crash due to trying to destructure undefined object)
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    // make a request to the darksky API
    // provide latitude, longitude, API returns weather info
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
})

// req has .query prop that holds any query strings
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found.',
    name: 'Chris Brinkmann'
  })
})

// * wildcard to match any routes that have not been explicitly named already
// must come last or it will match before correct handler
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Page not found.',
    name: 'Chris Brinkmann'
  })
})

// listen starts the server listening for requests
// server takes 2 args: the port to listen on, and a callback to do whatever
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is up on port ${process.env.PORT}`)
})
