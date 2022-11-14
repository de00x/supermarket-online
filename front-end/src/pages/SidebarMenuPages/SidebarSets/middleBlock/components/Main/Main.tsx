import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { ReactComponent as Sets } from '../../../img/foodSets.svg'
import { addItem } from '../../../../../../redux/slices/slice'
import { FC, useEffect, useRef, useState } from 'react'
import { SkeletonSetsLoading } from './components'
import { Link } from 'react-router-dom'
import { ISets } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = () => {
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [allSets, setAllSets] = useState<ISets[]>([])
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
    localStorage.setItem('location', 'sets')
    window.scrollTo(0, 0)
    axios
      .get('/sets')
      .then((res) => setAllSets(res.data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log('errSets', err))
  }, [])

  /// onClick ///
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
  /// onClick ///

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
          <Sets /> <span>Сеты</span>
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
            {allSets.map((sets) => (
              <div key={sets.id} className={styles.item}>
                <img
                  src={sets.img}
                  alt="item1"
                  width={'226px'}
                  height={'190px'}
                />
                <div className={styles.setName}>{sets.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {sets.price} ₽</div>
                  <div onClick={() => addProductToBasket(sets)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonSetsLoading />
        )}
      </div>
    </>
  )
}
