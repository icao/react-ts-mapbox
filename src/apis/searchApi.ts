import axios from 'axios'

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoiaWNhb3MiLCJhIjoiY2wxMW5pMGplMndmZDNjcW9sNWkydnYzYyJ9.O5VDvBOQ2bLM9gQZ0UAzlQ',
  },
})

export default searchApi
