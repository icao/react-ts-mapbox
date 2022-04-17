import { useContext } from 'react'
import { MapContext } from '../context'
import { useGetTimeConvertion } from '../hooks/useGetTimeConvertion'
import { CarIcon } from './CarIcon'

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

  return (
    <div className="bg-white h-auto  rounded-md overflow-hidden shadow-black-medium">
      <div className="p-3">
        <p className="font-uber tracking-wide font-medium text-center text-zinc-600">
          Distancia:
          <span className="text-zinc-800">{` ${routeData.distance} km`}</span>
        </p>
      </div>
      <div className="bg-zinc-800 p-3 flex gap-3 justify-center items-center">
        <div className="w-4 h-4">
          <CarIcon color="white" />
        </div>
        <p className="font-uber tracking-wide font-medium text-white text-center text-lg">
          {/* Tiempo: */}
          <span className=" text-white">
            {days !== undefined &&
              hours !== undefined &&
              minutes !== undefined &&
              getTimeFormatted(days, hours, minutes)}
          </span>
        </p>
      </div>
    </div>
  )
}
