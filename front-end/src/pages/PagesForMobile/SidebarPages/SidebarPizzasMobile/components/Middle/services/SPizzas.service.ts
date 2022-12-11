import { ISets } from '../../../../SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { IPizzas } from '../types/SPizzasM.types'
import { useEffect } from 'react'
import axios from 'axios'

const SPizzasService = {
  GetPizzas(
    setAllPizzas: React.Dispatch<React.SetStateAction<IPizzas[]>>,
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[]
  ) {
    useEffect(() => {
      axios
        .get('/pizzas')
        .then((res) => setAllPizzas(res.data))
        .then(() => setIsLoadingPage(false))
        .catch((err) => console.log('errPizzas', err))
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default SPizzasService
