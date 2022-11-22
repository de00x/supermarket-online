import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { ReactComponent as WOK } from '../../../img/WOK.svg'
import { addItem } from '../../../../../../redux/slices/slice'
import { FC, useEffect, useRef, useState } from 'react'
import { SkeletonWokLoading } from './components'
import { Link } from 'react-router-dom'
import { IWok } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = () => {
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [allWoks, setAllWok] = useState<IWok[]>([])
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
    localStorage.setItem('location', 'wok')
    window.scrollTo(0, 0)
    axios
      .get('/wok')
      .then((res) => setAllWok(res.data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log('errWok', err))
  }, [])

  /// onClick ///
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
  /// onClick ///

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
          <WOK /> <span>Вок</span>
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
            {allWoks.map((wok) => (
              <div key={wok.id} className={styles.item}>
                <img src={wok.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{wok.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {wok.price} ₽</div>
                  <div onClick={() => addProductToBasket(wok)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonWokLoading />
        )}
      </div>
    </>
  )
}
