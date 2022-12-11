import { ISets, ISRollsControllersProps } from '../types/SRolls.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SRollsControllers = ({
  allRolls,
  setSortBy,
  setSortFly,
  setErrAuth,
  setAllRolls,
}: ISRollsControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (rolls: ISets): void => {
    const item: ISets = {
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
      .get('/rolls')
      .then((res) => setAllRolls(res.data))
      .catch((err) => console.log('errPizzas', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allRolls.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllRolls(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allRolls.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllRolls(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SRollsControllers
