/**
 * Aqui definimos el estado del contexto, la informacion que almacenamos al momento
 */
import { useEffect, useReducer } from 'react'
import { searchApi } from '../../apis'

import { getUserLocation } from '../../helpers'
import { Feature, IPlacesResponse } from '../../interfaces/places'

import { PlacesContext } from './PlacesContext'
import { placesReducer } from './PlacesReducer'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  places: Feature[]
  isLoadingPlaces: boolean
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  places: [],
  isLoadingPlaces: false,
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation().then((coords) => {
      dispatch({ type: 'setUserLocation', payload: coords })
    })
  }, [])

  const searchPlaceByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) return [] // TODO: Limpiar state
    if (!state.userLocation) throw new Error('NO hay ubicación del usuario')

    dispatch({ type: 'setIsLoadingPlaces' })

    const response = await searchApi.get<IPlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    })

    dispatch({ type: 'setPlaces', payload: response.data.features })

    return response.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        // Methods
        searchPlaceByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
