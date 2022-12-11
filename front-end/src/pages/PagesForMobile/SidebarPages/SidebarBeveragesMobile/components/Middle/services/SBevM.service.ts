import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { IBeverages } from '../types/SBeveragesM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SBevMService = {
  GetBeverages(
    setAllBeverages: React.Dispatch<React.SetStateAction<IBeverages[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/beverages')
        .then((res) => setAllBeverages(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errBeverages', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SBevMService
