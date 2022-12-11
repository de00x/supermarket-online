import { IPizzas, ISPizzasControllersProps } from '../types/SPizzas.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SPizzasControllers = ({
  allPizzas,
  setSortBy,
  setSortFly,
  setErrAuth,
  setAllPizzas,
}: ISPizzasControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (pizzas: IPizzas): void => {
    const item: IPizzas = {
      id: pizzas.id,
      img: pizzas.img,
      name: pizzas.name,
      info: pizzas.info,
      price: pizzas.price,
      count: pizzas.count,
    }
    if (localStorage.getItem('login') === null) {
      window.scrollTo(0, 0)
      setErrAuth(true)
      setTimeout(() => {
        setErrAuth(false)
      }, 7000)
    } else dispatch(addItem(item))
  }
  // Sort by //
  const getDefault = (): void => {
    setSortBy('По умолчанию')
    setSortFly(false)
    axios
      .get('/pizzas')
      .then((res) => setAllPizzas(res.data))
      .catch((err) => console.log('errPizzas', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allPizzas.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllPizzas(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allPizzas.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllPizzas(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SPizzasControllers
