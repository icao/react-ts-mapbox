import mapboxgl, { Map } from 'mapbox-gl'
import { useContext, useLayoutEffect, useRef } from 'react'
import { MapContext, PlacesContext } from '../context'
import { Button } from './Button'
import { Loading } from './Loading'
import { LocationCenterIcon } from './LocationCenterIcon'

const TOKEN_MAPBOX = import.meta.env.VITE_APP_MAPBOX_API_KEY

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { map, isMapReady, setMap } = useContext(MapContext)
  const mapContainer = useRef<HTMLDivElement>(null)

  mapboxgl.accessToken = TOKEN_MAPBOX

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapContainer.current!, // container ID
        // style: 'mapbox://styles/mapbox/dark-v10', // style URL
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        // style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      })

      setMap(map)
    }
  }, [isLoading])

  const centerMap = () => {
    if (!isMapReady) throw Error('El mapa no está listo')
    if (!userLocation) throw Error('No hay ubicación del usuario')

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    })
  }

  return (
    <div ref={mapContainer} className="bg-zinc-50 w-full h-screen">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className="absolute z-10 top-10 right-10">
            <Button onClick={centerMap} size="mini">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6">
                  <LocationCenterIcon color="white" />
                </div>
              </div>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
