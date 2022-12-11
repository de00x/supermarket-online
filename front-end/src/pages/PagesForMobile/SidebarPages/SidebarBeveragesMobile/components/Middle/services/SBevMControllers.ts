import { IBeverages, ISBevMControllersProps } from '../types/SBeveragesM.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { selectCart } from '../../../../../../../redux/slices/selectors'

const SBevMControllers = ({
  setSortBy,
  setSortFly,
  allBeverages,
  setErrNotAuth,
  setAllBeverages,
}: ISBevMControllersProps) => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const addProductToBasket = (cartProduct: IBeverages): void => {
    const item: IBeverages = {
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
      .get('/beverages')
      .then((res) => setAllBeverages(res.data))
      .catch((err) => console.log('errBeverages', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allBeverages.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllBeverages(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allBeverages.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllBeverages(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore, totalPrice, totalCount, items }
}
export default SBevMControllers
