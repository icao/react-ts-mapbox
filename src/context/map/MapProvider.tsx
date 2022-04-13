import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl'
import { useContext, useEffect, useReducer } from 'react'
import { PlacesContext } from '../'
import { directionsApi } from '../../apis'
import { IDirectionsResponse, Route } from '../../interfaces/directions'

import { MapContext } from './MapContext'
import { mapReducer } from './MapReducer'

/**
 * Aqui definimos el estado del contexto, la informacion que almacenamos al momento
 */

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface RouteData {
  duration: number
  distance: number
}
export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
  routeData: RouteData
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  routeData: {
    duration: 0,
    distance: 0,
  },
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

    // 4.- Limpiar polilines para no visualizar nada en la sig busqueda
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    // 5.- Mandamos los nuevos markers
    dispatch({ type: 'setMarkers', payload: newMarkers })
  }, [places])

  const setMap = (map: Map) => {
    const myLocation = new Popup().setHTML(`<p>Mi ubicación!</p>`)
    // Mi ubicacion
    new Marker({ color: '#0070f3' })
      .setLngLat(map.getCenter())
      .setPopup(myLocation)
      .addTo(map)

    dispatch({
      type: 'setMap',
      payload: map,
    })
  }

  const getRoutesBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<IDirectionsResponse>(
      // TODO: Manda rparametro cycling, walking, driving
      // `cycling/${start.join(',')}; ${end.join(',')}`
      `driving/${start.join(',')}; ${end.join(',')}`
      // `walking/${start.join(',')}; ${end.join(',')}`
    )
    console.log(response)

    // Obteniendo tiempo y distanci de la ruta
    // TODO: almacenar en estado y mostrarlo en algun lado del mapa
    const { distance, duration, geometry } = response.data.routes[0]
    const { coordinates } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms = kms / 100

    const minutes = Math.floor(duration / 60)

    dispatch({type: 'setRouteData', payload: [minutes, kms]})
    console.log('Distancia: ' + kms + ' - ' + 'Tiempo: ' + minutes)

    // BOUNDS: Creamos un delimitador de zona en el mapa para centrar la ruta seleccionada
    const bounds = new LngLatBounds(start, start)

    for (const coordinate of coordinates) {
      const [lng, lat] = coordinate
      bounds.extend([lng, lat])
    }

    state.map?.fitBounds(bounds, {
      padding: { top: 200, bottom: 200, left: 500, right: 200 },
    })

    // POLYLINES: Creamos un trazado de nuestra ruta con una polilinea
    const sourceData: AnySourceData = {
      type: 'geojson',
      lineMetrics: true, // para lopilinea con gradiente
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
          },
        ],
      },
    }

    // Si existe una poliniea previa, remuevela
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    // Agrega la polilinea
    state.map?.addSource('RouteString', sourceData)
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3.5,
        'line-gradient': [
          'interpolate',
          ['linear'],
          ['line-progress'],
          0,
          'royalblue',
          // 0.4,
          // 'royalblue',
          1,
          'purple',
        ],
      },
    })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        //methods
        setMap,
        getRoutesBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
