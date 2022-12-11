import { addItem } from '../../../../../../../redux/slices/slice'
import { ISWokControllersProps, IWok } from '../types/SWok.types'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SWokControllers = ({
  allWoks,
  setAllWok,
  setSortBy,
  setSortFly,
  setErrAuth,
}: ISWokControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (wok: IWok): void => {
    const item: IWok = {
      id: wok.id,
      img: wok.img,
      name: wok.name,
      info: wok.info,
      price: wok.price,
      count: wok.count,
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
      .get('/wok')
      .then((res) => setAllWok(res.data))
      .catch((err) => console.log('errWok', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allWoks.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllWok(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allWoks.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllWok(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SWokControllers
