import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { IStocks } from '../types/SStocks.types'
import { useEffect } from 'react'
import axios from 'axios'

const SStocksService = {
  GetStocks(
    setAllStocks: React.Dispatch<React.SetStateAction<IStocks[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/stocks')
        .then((res) => setAllStocks(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errStocks', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SStocksService
