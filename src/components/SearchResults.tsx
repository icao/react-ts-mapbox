import { useContext } from 'react'
import { PlacesContext } from '../context'
import { LoadingPlaces } from './LoadingPlaces'
import { SearchResultItem } from './SearchResultItem'

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)

  return (
    <>
      {isLoadingPlaces && <LoadingPlaces />}
      {places.length > 0 && (
        <ul className="bg-white mediu mt-2 p-0 overflow-hidden text-zinc-700 w-80 h-auto flex flex-col gap-1 rounded-md shadow-black-medium ">
          {places.map((place) => (
            <SearchResultItem key={place.id} place={place}/>
          ))}
        </ul>
      )}
    </>
  )
}
