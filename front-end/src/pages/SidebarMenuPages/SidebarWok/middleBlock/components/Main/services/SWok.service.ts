import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { IWok } from '../types/SWok.types'
import { useEffect } from 'react'
import axios from 'axios'

const SWokService = {
  GetAllWok(
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[],
    setAllWok: React.Dispatch<React.SetStateAction<IWok[]>>,
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
      localStorage.setItem('location', 'wok')
      window.scrollTo(0, 0)
      axios
        .get('/wok')
        .then((res) => setAllWok(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errWok', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SWokService
