import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { ICornDog } from '../types/SCornDogs.types'
import { useEffect } from 'react'
import axios from 'axios'

const SCornDogsService = {
  SetProductLS(isMounted: React.MutableRefObject<boolean>, items: ISets[]) {
    useEffect(() => {
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
  GetAllCornDogs(
    setAllCornDogs: React.Dispatch<React.SetStateAction<ICornDog[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    useEffect(() => {
      localStorage.setItem('location', 'cornDogs')
      window.scrollTo(0, 0)
      axios
        .get('/cornDogs')
        .then((res) => setAllCornDogs(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errCornDogs', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SCornDogsService
