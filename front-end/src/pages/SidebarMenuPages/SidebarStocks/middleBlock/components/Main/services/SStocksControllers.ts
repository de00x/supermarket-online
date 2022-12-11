import { ISSControllersProps, IStocks } from '../types/SStocks.types'
import { addItem } from '../../../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SStocksControllers = ({
  allStocks,
  setSortBy,
  setErrAuth,
  setSortFly,
  setAllStocks,
}: ISSControllersProps) => {
  const dispatch = useDispatch()
  const addProductToBasket = (stocks: IStocks): void => {
    const item: IStocks = {
      id: stocks.id,
      img: stocks.img,
      name: stocks.name,
      info: stocks.info,
      price: stocks.price,
      count: stocks.count,
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
      .get('/stocks')
      .then((res) => setAllStocks(res.data))
      .catch((err) => console.log('errStocks', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allStocks.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllStocks(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allStocks.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllStocks(result)
  }
  // Sort by //
  return { addProductToBasket, getDefault, getLess, getMore }
}
export default SStocksControllers
