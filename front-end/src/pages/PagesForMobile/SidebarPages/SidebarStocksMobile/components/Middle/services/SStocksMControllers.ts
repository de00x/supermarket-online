import { ISStocksMControllersProps, IStocks } from '../types/SStocks.types'
import { selectCart } from '../../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SStocksMControllers = ({
  allStocks,
  setSortBy,
  setSortFly,
  setAllStocks,
  setErrNotAuth,
}: ISStocksMControllersProps) => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const dispatch = useDispatch()
  const addProductToBasket = (cartProduct: IStocks): void => {
    const item: IStocks = {
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
      .get('/stocks')
      .then((res) => setAllStocks(res.data))
      .catch((err) => console.log('errStocks', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allStocks.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllStocks(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allStocks.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllStocks(result)
  }
  // Sort by //
  return { items, totalPrice, totalCount, addProductToBasket, getDefault, getLess, getMore }
}
export default SStocksMControllers
