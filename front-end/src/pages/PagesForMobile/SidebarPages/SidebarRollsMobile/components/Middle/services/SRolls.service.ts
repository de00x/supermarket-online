import { ISets } from '../types/SRollsM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SRollsService = {
  GetRolls(
    setAllRolls: React.Dispatch<React.SetStateAction<ISets[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/rolls')
        .then((res) => setAllRolls(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errRolls', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SRollsService
