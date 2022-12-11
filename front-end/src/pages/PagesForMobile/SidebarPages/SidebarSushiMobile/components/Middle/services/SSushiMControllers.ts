import { ISSushiMControllersProps, ISushi } from '../types/SSushiM.types'
import { selectCart } from '../../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SSushiMControllers = ({
  allSushi,
  setSortBy,
  setSortFly,
  setAllSushi,
  setErrNotAuth,
}: ISSushiMControllersProps) => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const addProductToBasket = (cartProduct: ISushi): void => {
    const item: ISushi = {
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
      .get('/sushi')
      .then((res) => setAllSushi(res.data))
      .catch((err) => console.log('errSushi', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allSushi.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllSushi(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allSushi.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllSushi(result)
  }
  // Sort by //
  return { items, totalPrice, totalCount, addProductToBasket, getDefault, getLess, getMore }
}
export default SSushiMControllers
