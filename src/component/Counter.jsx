import { useEffect, useState } from 'react'

export default function Counter({initialHours,initialMinutes,initialSeconds}) {


  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
          } else {
            clearInterval(countdownInterval)
          }
        }
      }
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [hours, minutes, seconds])
  return (
    <span className="countdown font-mono text-2xl">
      <span style={{ '--value': `${String(hours).padStart(2, '0')}` }}></span>:
      <span style={{ '--value': `${String(minutes).padStart(2, '0')}` }}></span>
      :
      <span style={{ '--value': `${String(seconds).padStart(2, '0')}` }}></span>
    </span>
  )
}
