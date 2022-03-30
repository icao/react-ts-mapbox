import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoiaWNhb3MiLCJhIjoiY2wxMW5pMGplMndmZDNjcW9sNWkydnYzYyJ9.O5VDvBOQ2bLM9gQZ0UAzlQ',
  },
})

export default directionsApi
