import { IBeverage, ISBevControllersProps } from '../types/SBeverages.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SBeveragesControllers = ({
  setErrAuth,
  setSortBy,
  setSortFly,
  setAllBeverages,
  allBeverages,
}: ISBevControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (rolls: IBeverage): void => {
    const item: IBeverage = {
      id: rolls.id,
      img: rolls.img,
      name: rolls.name,
      info: rolls.info,
      price: rolls.price,
      count: rolls.count,
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
      .get('/beverages')
      .then((res) => setAllBeverages(res.data))
      .catch((err) => console.log('errBeverages', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allBeverages.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllBeverages(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allBeverages.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllBeverages(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SBeveragesControllers
