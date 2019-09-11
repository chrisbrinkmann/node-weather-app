const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let locationElem = document.querySelector('#location')
let forecastElem = document.querySelector('#forecast')

// send form input to server's /weather route
// /weather sends input (address) to geocode+forecast API
weatherForm.addEventListener('submit', e => {
  e.preventDefault() // prevents browser refresh / page rerender

  locationElem.textContent = `Loading...`
  forecastElem.textContent = ``

  // fetch is a browser based API, but we can use it because this script
  // runs in the client browser (called from index.hbs)
  fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        return (locationElem.textContent = data.error)
      }

      locationElem.textContent = data.location
      forecastElem.textContent = data.forecast
    })
    .catch(error => console.log('Big error:', error))
})
