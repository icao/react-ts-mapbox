import { useContext, useState } from 'react'
import clsx from 'clsx'
import { MapContext, PlacesContext } from '../context'

import { LoadingPlaces } from './LoadingPlaces'
import { RouteData } from './RouteData'
import { SearchResultItem } from './SearchResultItem'

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const { routeData } = useContext(MapContext)
  const [isActive, setIsActive] = useState('')

  return (
    <>
      {isLoadingPlaces && <LoadingPlaces />}
      {places.length > 0 && (
        <div className="flex gap-60">
          <ul className="bg-transparent mediu mt-2 p-0 overflow-hidden text-zinc-700 w-96 h-auto flex flex-col gap-2 rounded-md shadow-black-medium ">
            {places.map((place) => (
              <li
                key={place.id}
                className={clsx('bg-zinc-100 h-auto p-3 flex justify-between gap-3', {
                  'text-next-blue bg-blue-100': isActive === place.id,
                })}
                onClick={() => setIsActive(place.id)}
              >
                <SearchResultItem place={place} />
              </li>
            ))}
          </ul>
          {(routeData.distance !== undefined || routeData.duration !== undefined) && (
            <div className="mt-2 ">
              <RouteData />
            </div>
          )}
        </div>
      )}
    </>
  )
}
