import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { ReactComponent as Beverages } from '../../../img/beverages.svg'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { addItem } from '../../../../../../redux/slices/slice'
import { FC, useEffect, useRef, useState } from 'react'
import { SkeletonBeveragesLoading } from './components'
import { Link } from 'react-router-dom'
import { IBeverage } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = () => {
  const [allBeverages, setAllBeverages] = useState<IBeverage[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)

  useEffect(() => {
    localStorage.setItem('location', 'beverages')
    window.scrollTo(0, 0)
    axios
      .get('/beverages')
      .then((res) => setAllBeverages(res.data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log('errBeverages', err))
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  /// onClick ///
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
  /// onClick ///

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

  /// styles ///
  const stylesErrAuth = cn(styles.errAuth, { [styles.errAuthActive]: errAuth })
  const stylesSort = cn(styles.sort, { [styles.sortTrue]: sortFly })
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
          <Beverages /> <span>Напитки</span>
        </div>
        <div className={stylesSort}>
          <div>Сортировка</div>
          <div className={styles.sortByContainer}>
            <div
              className={styles.currentSortBy}
              onClick={() => setSortFly(!sortFly)}
            >
              {sortBy}
            </div>
            <div>
              {!sortFly ? (
                <div
                  className={styles.sortByArrow}
                  onClick={() => setSortFly(!sortFly)}
                >
                  ▼
                </div>
              ) : (
                <div
                  className={styles.sortByArrow}
                  onClick={() => setSortFly(!sortFly)}
                >
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
            {allBeverages.map((beverage) => (
              <div key={beverage.id} className={styles.item}>
                <img
                  src={beverage.img}
                  alt="item1"
                  width={'226px'}
                  height={'190px'}
                />
                <div className={styles.setName}>{beverage.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {beverage.price} ₽</div>
                  <div onClick={() => addProductToBasket(beverage)}>
                    В корзину
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonBeveragesLoading />
        )}
      </div>
    </>
  )
}
