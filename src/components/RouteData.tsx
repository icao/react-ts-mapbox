import { useContext } from 'react'
import { MapContext } from '../context'
import { useGetTimeConvertion } from '../hooks/useGetTimeConvertion'

type timeValue = number | undefined

export const RouteData = () => {
  const { routeData } = useContext(MapContext)
  const [days, hours, minutes] = useGetTimeConvertion(routeData.duration)

  const getSuffix = (value: timeValue) => {
    if (value === 1) {
      return ''
    } else {
      return 's'
    }
  }

  const getTimeFormated = (days: timeValue, hours: timeValue, minutes: timeValue) => {
    {
      /* TODO: Agregar validaciones para queno aparezcan los 0 si no hay dias, horas, minuts */
    }
    return ` ${days} dia${getSuffix(days)} ${hours} hora${getSuffix(
      hours
    )} ${minutes} minuto${getSuffix(minutes)}`
  }

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
      <p>
        <span className="font-uber tracking-wide font-medium ">Tiempo:</span>
        {days !== undefined &&
          hours !== undefined &&
          minutes !== undefined &&
          getTimeFormated(days, hours, minutes)}
      </p>

      
    </div>
  )
}
