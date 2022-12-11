import { ISWokMControllersProps, IWok } from '../types/SWokM.types'
import { selectCart } from '../../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SWokMControllers = ({
  allWok,
  setAllWok,
  setSortBy,
  setSortFly,
  setErrNotAuth,
}: ISWokMControllersProps) => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const addProductToBasket = (cartProduct: IWok): void => {
    const item: IWok = {
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
      .get('/wok')
      .then((res) => setAllWok(res.data))
      .catch((err) => console.log('errWok', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allWok.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllWok(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allWok.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllWok(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore, items, totalPrice, totalCount }
}
export default SWokMControllers
