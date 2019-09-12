const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationElem = document.querySelector('#location')
const forecastElem = document.querySelector('#forecast')

// send form input to server's /weather route
// /weather sends input (address) to geocode+forecast API
weatherForm.addEventListener('submit', e => {
  e.preventDefault() // prevents browser refresh / page rerender

  locationElem.textContent = `Loading...`
  forecastElem.textContent = ``

  // fetch is a browser based API, but we can use it because this script
  // runs in the client browser (called from index.hbs)
  // NOTE fetch can accept URL relative to local domain, so no process.env needed
  fetch(`/weather?address=${search.value}`)
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
