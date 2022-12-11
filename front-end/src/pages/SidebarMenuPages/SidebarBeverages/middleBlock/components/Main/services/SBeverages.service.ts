import axios from 'axios'
import { useEffect } from 'react'
import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { IBeverage } from '../types/SBeverages.types'

const SBeveragesService = {
  GetAllBeverages(
    setAllBeverages: React.Dispatch<React.SetStateAction<IBeverage[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      localStorage.setItem('location', 'beverages')
      window.scrollTo(0, 0)
      axios
        .get('/beverages')
        .then((res) => setAllBeverages(res.data))
        .then(() => setIsLoading(false))
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
export default SBeveragesService
