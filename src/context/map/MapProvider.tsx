import { Map, Marker, Popup } from 'mapbox-gl'
import { useReducer } from 'react'
import { MapContext } from './MapContext'
import { mapReducer } from './MapReducer'

/**
 * Aqui definimos el estado del contexto, la informacion que almacenamos al momento
 */

export interface MapState {
  isMapReady: boolean
  map?: Map
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  const setMap = (map: Map) => {
    const myLocation = new Popup().setHTML(`<p>Hola Mundo!</p>`)

    new Marker({ color: '#0070f3' })
      .setLngLat(map.getCenter())
      .setPopup(myLocation)
      .addTo(map)

    dispatch({
      type: 'setMap',
      payload: map,
    })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        //methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
