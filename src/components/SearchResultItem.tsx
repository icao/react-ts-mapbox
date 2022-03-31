import { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places'
import { Button } from './Button'

interface IProps {
  place: Feature
}

export const SearchResultItem = ({ place }: IProps) => {
  const { getRoutesBetweenPoints } = useContext(MapContext)

  const { userLocation } = useContext(PlacesContext)

  const getRoute = (place: Feature) => {
    if (!userLocation) return

    const [lng, lat] = place.center

    getRoutesBetweenPoints(userLocation, [lng, lat])
  }

  return (
    <div>
      <h3 className="font-uber tracking-wide font-medium ">{place.text_es}</h3>
      <p className="font-uber font-thin text-zinc-400 tracking-wide text-sm">
        {place.place_name_es}
      </p>
      <div className="float-right mt-2">
        <Button size="thin" onClick={() => getRoute(place)}>
          <p className="font-uber font-thin text-sm">dirección</p>
        </Button>
      </div>
    </div>
  )
}
