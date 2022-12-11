import { ISSushiControllersProps, ISushi } from '../types/SSushi.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SSushiControllers = ({
  allSushi,
  setSortBy,
  setSortFly,
  setErrAuth,
  setAllSushi,
}: ISSushiControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (sushi: ISushi): void => {
    const item: ISushi = {
      id: sushi.id,
      img: sushi.img,
      name: sushi.name,
      info: sushi.info,
      price: sushi.price,
      count: sushi.count,
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
      .get('/sushi')
      .then((res) => setAllSushi(res.data))
      .catch((err) => console.log('errSushi', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allSushi.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllSushi(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allSushi.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllSushi(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SSushiControllers
