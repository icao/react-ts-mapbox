import clsx from 'clsx'
import { useContext, useState } from 'react'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places'
import { LoadingPlaces } from './LoadingPlaces'
import { SearchResultItem } from './SearchResultItem'

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const { map } = useContext(MapContext)

  const [isActive, setIsActive] = useState('')

  const flyToPlace = (place: Feature) => {
    setIsActive(place.id)
    const [lng, lat] = place.center
    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    })
  }

  return (
    <>
      {isLoadingPlaces && <LoadingPlaces />}
      {places.length > 0 && (
        <ul className="bg-transparent mediu mt-2 p-0 overflow-hidden text-zinc-700 w-96 h-auto flex flex-col gap-2 rounded-md shadow-black-medium ">
          {places.map((place) => (
            <li
              key={place.id}
              onClick={() => flyToPlace(place)}
              className={clsx('cursor-pointer bg-zinc-100 h-auto p-3', {
                'text-next-blue bg-blue-100': isActive === place.id,
              })}
            >
              <SearchResultItem place={place} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
