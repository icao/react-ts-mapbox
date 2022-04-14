import { useContext } from 'react'
import { MapContext } from '../context'

export const RouteData = () => {
  {
    /* // TODO Consumir datos del mapContext, verifiar como hacer bien la conversion del timpo */
    // // TODO: borrar en cada busqueda nueva de query en el serach
  }

  const { routeData } = useContext(MapContext)

  return (
    <div className="bg-white h-auto p-3 rounded-md shadow-black-medium">
      <p>
        <span className="font-uber tracking-wide font-medium ">Distancia:</span>
        {` ${routeData.distance} km`}
      </p>
      <p>
        <span className="font-uber tracking-wide font-medium ">Tiempo:</span>
        {` ${routeData.duration} mints`}
      </p>
    </div>
  )
}
