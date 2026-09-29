import axios from 'axios'
import { useEffect, useState } from 'react'

function CountryView({country}) {
  const [weather, setWeather] = useState(null)
  const url = 'https://openweathermap.org/payload/api/media/file/'

  useEffect(() => {
    const [lat, lon] = country.latlng

    getWeather(lat, lon)
      .then(weatherData => {
        setWeather(weatherData)
      })
  }, [country])


  return (
    <div>
      <h1> {country.name.common}</h1>
      <div>
        Capital {country.capital} <br />
        Area {country.area}
      </div>
      <h2> Languages </h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}> {language} </li>
        ))}
      </ul>
      <img src={country.flags.png}/>
      <h2> Weather </h2>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <img src={url + weather.weather[0].icon +  '.png'}/>
          <p>Wind {weather.wind.speed} m/s </p>
        </div>
      )}
    </div>
  )
}

function CountryList({countries, onShow, selectedCountry}) {
  if (countries.length > 1 && countries.length <= 10) {
    return (
    <ul>
      {countries.map(country =>
        <li key={country.ccn3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>
            show
          </button>
          {selectedCountry?.ccn3 === country.ccn3
            ? <CountryView country={selectedCountry}/>
            : null}
        </li>
      )}
    </ul>
    )
  }
  else if (countries.length > 10) {
    return (
      <div>
        Too many matches
      </div>
    )
  }
  else if (countries.length == 1){
    const country = countries[0]
    return (
      <CountryView country={country}/>
    )
  }
  else return null
  
}

function Searchbox({query, onChange}) {
  return (
    <div>
      find countries <input
      value={query} onChange={onChange}
      />
    </div>
  )
}

function getCountries() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

function getWeather(lat, lon) {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

  return axios.get(url).then(response => response.data)
}

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    getCountries()
    .then(retrievedCountries => {
      setCountries(retrievedCountries)
    })
  }, [])

  function onQueryChange(event) {
    setQuery(event.target.value)
  }

  function onShow(country) {
    setSelectedCountry(country)
  }

  const shownCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(query.toLowerCase()) 
  )

  return (
    <div>
      <Searchbox query={query} onChange={onQueryChange}/>
      <CountryList countries={shownCountries} onShow={onShow} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App
