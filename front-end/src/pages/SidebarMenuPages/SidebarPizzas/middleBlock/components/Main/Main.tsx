import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { SortByTypeAndSize } from './components/SortByTypeAndSize'
import { ReactComponent as Pizza } from '../../../img/pizza.svg'
import { addItem } from '../../../../../../redux/slices/slice'
import { FC, useEffect, useRef, useState } from 'react'
import { SkeletonPizzasLoading } from './components'
import { Link } from 'react-router-dom'
import { IPizzas } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = () => {
  const [allPizzas, setAllPizzas] = useState<IPizzas[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  useEffect(() => {
    localStorage.setItem('location', 'pizzas')
    window.scrollTo(0, 0)
    axios
      .get('/pizzas')
      .then((res) => setAllPizzas(res.data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log('errPizzas', err))
  }, [])

  /// onClick ///
  const addProductToBasket = (pizzas: IPizzas): void => {
    const item: IPizzas = {
      id: pizzas.id,
      img: pizzas.img,
      name: pizzas.name,
      info: pizzas.info,
      price: pizzas.price,
      count: pizzas.count,
    }
    if (localStorage.getItem('login') === null) {
      window.scrollTo(0, 0)
      setErrAuth(true)
      setTimeout(() => {
        setErrAuth(false)
      }, 7000)
    } else dispatch(addItem(item))
  }
  /// onClick ///

  // Sort by //
  const getDefault = (): void => {
    setSortBy('По умолчанию')
    setSortFly(false)
    axios
      .get('/pizzas')
      .then((res) => setAllPizzas(res.data))
      .catch((err) => console.log('errPizzas', err))
  }

  const getLess = (): void => {
    setSortBy('Сначала дешевле')
    setSortFly(false)
    const result = allPizzas.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return a.price - b.price
    })
    return setAllPizzas(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allPizzas.sort(function (a, b) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return b.price - a.price
    })
    return setAllPizzas(result)
  }
  // Sort by //

  /// styles ///
  const stylesSort = cn(styles.sort, { [styles.sortTrue]: sortFly })
  const stylesErrAuth = cn(styles.errAuth, { [styles.errAuthActive]: errAuth })
  const stylesErrAuthContainerBgdRed = cn(styles.errAuthContainer, {
    [styles.errAuthContainerBgdRed]: errAuth,
  })
  /// styles ///

  return (
    <>
      {localStorage.getItem('login') === null ? (
        <div className={stylesErrAuthContainerBgdRed}>
          <div className={stylesErrAuth}>
            Что бы сделать заказ
            <div>
              Вам необходимо{' '}
              <Link to={'/main'}>
                <span>авторизоваться.</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.containerHeader}>
        <div className={styles.header}>
          <Pizza /> <span>Пицца</span>
        </div>
        <div className={stylesSort}>
          <div>Сортировка</div>
          <div className={styles.sortByContainer}>
            <div className={styles.currentSortBy} onClick={() => setSortFly(!sortFly)}>
              {sortBy}
            </div>
            <div>
              {!sortFly ? (
                <div className={styles.sortByArrow} onClick={() => setSortFly(!sortFly)}>
                  ▼
                </div>
              ) : (
                <div className={styles.sortByArrow} onClick={() => setSortFly(!sortFly)}>
                  ▲
                </div>
              )}
            </div>
          </div>
          {sortFly && (
            <>
              <div className={styles.sortFlyContainer}>
                <div className={styles.sortFly}>
                  <div onClick={() => getDefault()}>По умолчанию</div>
                  <div onClick={() => getLess()}>Сначала дешевле</div>
                  <div onClick={() => getMore()}>Сначала дороже</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.container}>
        {!isLoading ? (
          <>
            {allPizzas.map((pizzas) => (
              <div key={pizzas.id} className={styles.item}>
                <img src={pizzas.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{pizzas.name}</div>
                <SortByTypeAndSize {...pizzas} />
                <div className={styles.buyProduct}>
                  <div>от {pizzas.price} ₽</div>
                  <div onClick={() => addProductToBasket(pizzas)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonPizzasLoading />
        )}
      </div>
    </>
  )
}
