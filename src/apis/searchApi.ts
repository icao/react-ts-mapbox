import axios from 'axios'

const TOKEN_MAPBOX = import.meta.env.VITE_APP_MAPBOX_API_KEY

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: TOKEN_MAPBOX,
    // access_token:
    //   'pk.eyJ1IjoiaWtoYXJ1cyIsImEiOiJjbDIzd2ozNjEweDRoM2VwZmp3emVkamtlIn0.0ccZLqRid0Giq9_TTB6IUw',
  },
})

export default searchApi
