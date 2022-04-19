import { useEffect, useState } from 'react'

type Props = number | undefined

export const useGetTimeConvertion = (duration: Props) => {
  const [days, setDays] = useState<Props>(undefined)
  const [hours, setHours] = useState<Props>(undefined)
  const [minutes, setMinutes] = useState<Props>(undefined)

  useEffect(() => {
    if (duration !== undefined) {
      // console.log('DURACION CUSTOM HOOK ' + duration)
      let minutes = Math.floor((duration / 60) % 60)
      let hours = Math.floor((duration / (60 * 60)) % 24)
      let days = Math.floor(duration / (60 * 60 * 24))
      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      // console.log(
      //   `********   ${days} dias, ${hours} horas, ${minutes} minutos   ********`
      // )
    }
  }, [duration])

  return [days, hours, minutes]
}
