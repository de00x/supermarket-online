import { ISets, ISSetsControllersProps } from '../types/SSets.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SSetsControllers = ({
  allSets,
  setSortBy,
  setSortFly,
  setErrAuth,
  setAllSets,
}: ISSetsControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (sets: ISets): void => {
    const item: ISets = {
      id: sets.id,
      img: sets.img,
      name: sets.name,
      info: sets.info,
      price: sets.price,
      count: sets.count,
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
      .get('/sets')
      .then((res) => setAllSets(res.data))
      .catch((err) => console.log('errSets', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allSets.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllSets(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allSets.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllSets(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SSetsControllers
