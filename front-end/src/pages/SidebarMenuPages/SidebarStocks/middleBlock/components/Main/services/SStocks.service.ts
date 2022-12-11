import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { IStocks } from '../types/SStocks.types'
import { useEffect } from 'react'
import axios from 'axios'

const SStocksService = {
  GetAllStocks(
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[],
    setAllStocks: React.Dispatch<React.SetStateAction<IStocks[]>>,
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
      localStorage.setItem('location', 'stocks')
      window.scrollTo(0, 0)
      axios
        .get('/stocks')
        .then((res) => setAllStocks(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errStocks', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SStocksService
