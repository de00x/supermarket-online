import { ISets } from '../types/SSetsM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SSetsMService = {
  GetSets(
    setAllSets: React.Dispatch<React.SetStateAction<ISets[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/sets')
        .then((res) => setAllSets(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errSets', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SSetsMService
