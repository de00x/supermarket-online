import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { ISushi } from '../types/SSushi.types'
import { useEffect } from 'react'
import axios from 'axios'

const SSushiService = {
  GetAllSushi(
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[],
    setAllSushi: React.Dispatch<React.SetStateAction<ISushi[]>>,
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
      localStorage.setItem('location', 'sushi')
      window.scrollTo(0, 0)
      axios
        .get('/sushi')
        .then((res) => setAllSushi(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errSushi', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SSushiService
