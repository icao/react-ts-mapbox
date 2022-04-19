import axios from 'axios'

const TOKEN_MAPBOX = import.meta.env.VITE_APP_MAPBOX_API_KEY

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/',
  params: {
    alternatives: false,
    geometries: 'geojson',
    // continue_straight: true,
    language: 'es',
    overview: 'full',
    steps: false,
    access_token: TOKEN_MAPBOX,
    // access_token:
    //   'pk.eyJ1IjoiaWtoYXJ1cyIsImEiOiJjbDIzd2ozNjEweDRoM2VwZmp3emVkamtlIn0.0ccZLqRid0Giq9_TTB6IUw',
  },
})

export default directionsApi
