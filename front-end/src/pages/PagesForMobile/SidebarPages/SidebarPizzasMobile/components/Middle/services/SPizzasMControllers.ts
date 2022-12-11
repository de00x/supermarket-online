import { IPizzas, ISPMControllersProps } from '../types/SPizzasM.types'
import { selectCart } from '../../../../../../../redux/slices/selectors'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SPizzasMControllers = ({
  allPizzas,
  setSortBy,
  setSortFly,
  setAllPizzas,
  setErrNotAuth,
}: ISPMControllersProps) => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const dispatch = useDispatch()
  const addProductToBasket = (cartProduct: IPizzas): void => {
    const item: IPizzas = {
      id: cartProduct.id,
      img: cartProduct.img,
      name: cartProduct.name,
      info: cartProduct.info,
      price: cartProduct.price,
      count: cartProduct.count,
    }
    if (localStorage.getItem('login') !== null) {
      dispatch(addItem(item))
    } else {
      window.scrollTo(0, 0)
      setErrNotAuth(true)
      setTimeout(() => {
        setErrNotAuth(false)
      }, 7000)
    }
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
      return a.price - b.price
    })
    return setAllPizzas(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allPizzas.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllPizzas(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore, items, totalPrice, totalCount }
}
export default SPizzasMControllers
