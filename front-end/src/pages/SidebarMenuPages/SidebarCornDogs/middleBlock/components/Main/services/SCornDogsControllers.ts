import { ICornDog, ISCDogsControllersProps } from '../types/SCornDogs.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SCornDogsControllers = ({
  setSortBy,
  setErrAuth,
  setSortFly,
  allCornDogs,
  setAllCornDogs,
}: ISCDogsControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (cornDog: ICornDog): void => {
    const item: ICornDog = {
      id: cornDog.id,
      img: cornDog.img,
      name: cornDog.name,
      info: cornDog.info,
      price: cornDog.price,
      count: cornDog.count,
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
      .get('/cornDogs')
      .then((res) => setAllCornDogs(res.data))
      .catch((err) => console.log('errCornDogs', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allCornDogs.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllCornDogs(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allCornDogs.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllCornDogs(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SCornDogsControllers
