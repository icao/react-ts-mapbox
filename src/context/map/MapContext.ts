import { Map } from 'mapbox-gl'
import { createContext } from 'react'
import { RouteData } from './MapProvider'

interface MapContextProps {
  isMapReady: boolean
  map?: Map
  routeData: RouteData
  // methods
  setMap: (map: Map) => void
  getRoutesBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps)
