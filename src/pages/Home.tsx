import { useContext } from 'react'
import { MapView, SearchBar } from '../components'
import { PlacesContext } from '../context'

export const Home = () => {
  const { isLoading } = useContext(PlacesContext)
  return (
    <div>
      <MapView />
      {!isLoading && <SearchBar placeholder="Busca un lugar" />}
    </div>
  )
}
