import { ISets } from '../../../../../SidebarSets/middleBlock/components/Main/types/SSets.types'
import { IPizzas } from '../types/SPizzas.types'
import { useEffect } from 'react'
import axios from 'axios'

const SPizzasService = {
  GetAllPizzas(
    isMounted: React.MutableRefObject<boolean>,
    items: ISets[],
    setAllPizzas: React.Dispatch<React.SetStateAction<IPizzas[]>>,
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
      localStorage.setItem('location', 'pizzas')
      window.scrollTo(0, 0)
      axios
        .get('/pizzas')
        .then((res) => setAllPizzas(res.data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('errPizzas', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default SPizzasService
