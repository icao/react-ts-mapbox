import React from 'react'
import { createRoot } from 'react-dom/client'
import mapboxgl from 'mapbox-gl'
import MapsApp from './MapsApp'
import './index.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaWNhb3MiLCJhIjoiY2wxMW5pMGplMndmZDNjcW9sNWkydnYzYyJ9.O5VDvBOQ2bLM9gQZ0UAzlQ'

if (!navigator.geolocation) {
  alert('Lo sentimos, tu navegador no tiene soporte para Geolocalización')
  throw new Error('Lo sentimos, tu navegador no tiene soporte para Geolocalización')
}

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
