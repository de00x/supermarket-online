import { useEffect } from 'react'

const MiddleSliderService = {
  SetNewLocation() {
    useEffect(() => {
      localStorage.setItem('location', 'main')
    }, [])
  },
}
export default MiddleSliderService
