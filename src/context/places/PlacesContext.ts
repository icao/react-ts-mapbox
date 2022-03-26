/**
 * Aqui definimos las funciones que los componentes van a vver
 */

import { createContext } from 'react'
import { Feature } from '../../interfaces/places'

export interface PlacesContextProps {
  isLoading: boolean
  userLocation?: [number, number]
  // Methods
  searchPlaceByTerm: (query: string) => Promise<Feature[]>
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps)
