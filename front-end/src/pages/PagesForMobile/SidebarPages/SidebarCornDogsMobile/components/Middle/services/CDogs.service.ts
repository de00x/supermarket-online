import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { ICornDogs } from '../types/CDogsM.types'
import { useEffect } from 'react'
import axios from 'axios'

const CDogsService = {
  GetCornDogs(
    setAllCornDogs: React.Dispatch<React.SetStateAction<ICornDogs[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/cornDogs')
        .then((res) => setAllCornDogs(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errCornDogs', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default CDogsService
