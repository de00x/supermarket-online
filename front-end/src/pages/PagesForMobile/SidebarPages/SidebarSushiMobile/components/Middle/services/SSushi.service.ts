import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { ISushi } from '../types/SSushiM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SSushiService = {
  GetSushi(
    setAllSushi: React.Dispatch<React.SetStateAction<ISushi[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/sushi')
        .then((res) => setAllSushi(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errSushi', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SSushiService
