import { ISets } from '../types/SSets.types'
import { useEffect } from 'react'
import axios from 'axios'

const SSetsService = {
  GetAllSets(
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[],
    setAllSets: React.Dispatch<React.SetStateAction<ISets[]>>,
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
      localStorage.setItem('location', 'sets')
      window.scrollTo(0, 0)
      axios
        .get('/sets')
        .then((res) => setAllSets(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errSets', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SSetsService
