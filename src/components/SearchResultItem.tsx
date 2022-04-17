import { useContext } from 'react'

import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places'
import { Button } from './Button'
import { RouteIcon } from './RouteIcon'

interface IProps {
  place: Feature
}

export const SearchResultItem = ({ place }: IProps) => {
  const { map } = useContext(MapContext)

  const flyToPlace = (place: Feature) => {
    const [lng, lat] = place.center
    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    })
  }

  const { getRoutesBetweenPoints } = useContext(MapContext)

  const { userLocation } = useContext(PlacesContext)

  const getRoute = (place: Feature) => {
    if (!userLocation) return

    const [lng, lat] = place.center

    getRoutesBetweenPoints(userLocation, [lng, lat])
  }

  return (
    <>
      <div onClick={() => flyToPlace(place)} className="cursor-pointer">
        <h3 className="font-uber tracking-wide font-medium ">{place.text_es}</h3>
        <p className="font-uber font-thin text-zinc-400 tracking-wide text-sm">
          {place.place_name_es}
        </p>
      </div>
      <div className="flex items-center ">
        <Button size="thin" onClick={() => getRoute(place)}>
          <div className="flex items-center justify-center gap-3 ">
            <div className="w-4 h-4">
              <RouteIcon color="white" />
            </div>
            <p className="font-uber font-thin text-sm">ruta</p>
          </div>
        </Button>
      </div>
    </>
  )
}
