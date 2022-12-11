import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../../../../../hooks/hooks'
import { selectCart } from '../../../../../../../redux/slices/selectors'
import { addItem } from '../../../../../../../redux/slices/slice'
import { ISets, ISSetsMControllersProps } from '../types/SSetsM.types'

const SSetsMControllers = ({
  allSets,
  setSortBy,
  setSortFly,
  setAllSets,
  setErrNotAuth,
}: ISSetsMControllersProps) => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const dispatch = useDispatch()
  const addProductToBasket = (cartProduct: ISets): void => {
    const item: ISets = {
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
      .get('/sets')
      .then((res) => setAllSets(res.data))
      .catch((err) => console.log('errSets', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allSets.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllSets(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allSets.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllSets(result)
  }

  const getWeight = (): void => {
    setSortBy('По весу')
    setSortFly(false)
    const result = allSets.sort(function (a, b) {
      return parseInt(b.info) - parseInt(a.info)
    })
    return setAllSets(result)
  }
  // Sort by //
  return {
    items,
    getLess,
    getMore,
    getWeight,
    totalPrice,
    getDefault,
    totalCount,
    addProductToBasket,
  }
}
export default SSetsMControllers
