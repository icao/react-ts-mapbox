import { timeStamp } from 'console'
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

  const getTimeFormatted = (days: timeValue, hours: timeValue, minutes: timeValue) => {
    const timeFormatted = ` ${days === 0 ? '' : `${days} dia${getSuffix(days)}`} ${
      hours === 0 ? '' : `${hours} hora${getSuffix(hours)}`
    } ${minutes} minuto${getSuffix(minutes)}`

    return timeFormatted
  }

  //  TODO: Dar estilos al recuadro de los datos
  return (
    <div className="bg-white h-auto p-3 rounded-md shadow-black-medium">
      <p>
        <span className="font-uber tracking-wide font-medium ">Distancia:</span>
        {` ${routeData.distance} km`}
      </p>
      <p>
        <span className="font-uber tracking-wide font-medium ">Tiempo:</span>
        {days !== undefined &&
          hours !== undefined &&
          minutes !== undefined &&
          getTimeFormatted(days, hours, minutes)}
      </p>
    </div>
  )
}
