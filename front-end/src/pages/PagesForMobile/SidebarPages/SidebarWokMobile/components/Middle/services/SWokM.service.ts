import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { IWok } from '../types/SWokM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SWokMService = {
  GetWok(
    setAllWok: React.Dispatch<React.SetStateAction<IWok[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/wok')
        .then((res) => setAllWok(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errWok', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SWokMService
