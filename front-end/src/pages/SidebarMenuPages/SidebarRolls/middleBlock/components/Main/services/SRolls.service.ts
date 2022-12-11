import { ISets } from '../types/SRolls.types'
import { useEffect } from 'react'
import axios from 'axios'

const SRollsService = {
  GetAllRolls(
    items: ISets[],
    isMounted: React.MutableRefObject<boolean>,
    setAllRolls: React.Dispatch<React.SetStateAction<ISets[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    useEffect(() => {
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    useEffect(() => {
      localStorage.setItem('location', 'rolls')
      window.scrollTo(0, 0)
      axios
        .get('/rolls')
        .then((res) => setAllRolls(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errRolls', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SRollsService
