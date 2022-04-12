import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/',
  params: {
    alternatives: false,
    geometries: 'geojson',
    // continue_straight: true,
    language: 'es',
    overview: 'full',
    steps: false,
    access_token:
      'pk.eyJ1IjoiaWNhb3MiLCJhIjoiY2wxMW5pMGplMndmZDNjcW9sNWkydnYzYyJ9.O5VDvBOQ2bLM9gQZ0UAzlQ',
  },
})

export default directionsApi
