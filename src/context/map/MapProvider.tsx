import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl'
import { useContext, useEffect, useReducer } from 'react'
import { PlacesContext } from '../'

import { MapContext } from './MapContext'
import { mapReducer } from './MapReducer'

/**
 * Aqui definimos el estado del contexto, la informacion que almacenamos al momento
 */

interface Props {
  children: JSX.Element | JSX.Element[]
}
export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE) // estado del Map Context

  const { places } = useContext(PlacesContext)

  useEffect(() => {
    // 1.- Removemos los posibles marcadores ya establecidos de la busqueda previa, si es que los hay
    state.markers.forEach((marker) => marker.remove())
    // 2.- Definimos el arreglo de marcadores
    const newMarkers: Marker[] = []
    // 3.- Insertamos los nuevos markets de las coincidencias de la busqueda
    places.forEach((place) => {
      const [lng, lat] = place.center
      //creamos los popups
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `)
      //creamos los markers
      const marker = new Marker({ color: '#ff3366' })
        // .setLngLat(place.center as LngLatLike) //mi solucion pasarlo como un alias
        .setLngLat([lng, lat]) //ó pasarlo de la destructuracion de place.center
        .setPopup(popup) // pasamos los popups
        .addTo(state.map!)
      //adicionamos los marcadores al arreglo de markers
      newMarkers.push(marker)
    })

    // TODO: Limpiar polilines
    dispatch({ type: 'setMarkers', payload: newMarkers })
  }, [places])

  const setMap = (map: Map) => {
    const myLocation = new Popup().setHTML(`<p>Mi ubicación!</p>`)

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
