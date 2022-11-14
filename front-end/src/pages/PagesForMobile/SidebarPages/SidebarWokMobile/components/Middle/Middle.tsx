import { selectCart } from '../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { addItem } from '../../../../../../redux/slices/slice'
import { SkeletonSetsMobile } from '../../../../../Skeletons'
import { ReactComponent as SortBy } from './img/sortBy.svg'
import { ReactComponent as Cart } from './img/cart.svg'
import { FC, useEffect, useRef, useState } from 'react'
import { ReactComponent as Wok } from './img/WOK.svg'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IWok } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Middle: FC = (): JSX.Element => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [errNotAuth, setErrNotAuth] = useState(false)
  const [sortFly, setSortFly] = useState(false)
  const [allWok, setAllWok] = useState<IWok[]>([])
  const [sortBy, setSortBy] = useState('Сортировка')
  const isMounted = useRef(false)
  const dispatch = useDispatch()
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  useEffect(() => {
    axios
      .get('/wok')
      .then((res) => setAllWok(res.data))
      .then(() => setIsLoadingPage(false))
      .catch((err) => console.log('errWok', err))
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  /// onClick ///
  const addProductToBasket = (cartProduct: IWok): void => {
    const item: IWok = {
      id: cartProduct.id,
      img: cartProduct.img,
      name: cartProduct.name,
      info: cartProduct.info,
      price: cartProduct.price,
      count: cartProduct.count,
    }
    if (localStorage.getItem('login') !== null) {
      dispatch(addItem(item))
    } else {
      window.scrollTo(0, 0)
      setErrNotAuth(true)
      setTimeout(() => {
        setErrNotAuth(false)
      }, 7000)
    }
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
    const result = allWok.sort(function (a, b) {
      return a.price - b.price
    })
    return setAllWok(result)
  }

  const getMore = (): void => {
    setSortBy('Сначала дороже')
    setSortFly(false)
    const result = allWok.sort(function (a, b) {
      return b.price - a.price
    })
    return setAllWok(result)
  }
  // Sort by //

  // styles ///
  const classSortFlyOpenTextDefault = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'По умолчанию',
  })
  const classSortFlyOpenTextHigh = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дороже',
  })
  const classSortFlyOpenTextLow = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дешевле',
  })
  // styles ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTextContainer}>
          <div>
            <Wok />
          </div>
          <div className={styles.headerText}>Вок</div>
        </div>
        <Link to={'/basket'}>
          <div className={styles.basketContainer}>
            <div className={styles.basketCurrentPrice}>{totalPrice} ₽</div>
            <div className={styles.basketCurrentProduct}>
              <Cart /> <span>{totalCount}</span>
            </div>
          </div>
        </Link>
      </div>
      <div
        onClick={() => {
          setSortFly(!sortFly)
        }}
        className={cn(styles.sortByContainer, {
          [styles.sortByContainerActive]: sortFly,
        })}
      >
        <SortBy />
        <div className={styles.sortBy}>
          <div className={styles.sortByText}>{sortBy}</div>
          <div className={styles.sortByArrow}>{sortFly ? '▲' : '▼'}</div>
        </div>
      </div>
      {errNotAuth ? (
        <>
          <div className={styles.errNotAuthContainer}>
            <div>
              Для того что бы добавлять продукты в корзину
              <span>Вам необходимо авторизоваться.</span>
            </div>
          </div>
        </>
      ) : null}
      {sortFly && (
        <div className={styles.sortFlyOpen}>
          <div className={classSortFlyOpenTextDefault} onClick={getDefault}>
            По умолчанию
          </div>
          <div className={classSortFlyOpenTextLow} onClick={getLess}>
            Сначала дешевле
          </div>
          <div className={classSortFlyOpenTextHigh} onClick={getMore}>
            Сначала дороже
          </div>
        </div>
      )}
      {isLoadingPage ? (
        <>
          <div className={styles.productsContainerLoading}>
            <SkeletonSetsMobile />
          </div>
          <div className={styles.productsContainerLoading}>
            <SkeletonSetsMobile />
          </div>
          <div className={styles.productsContainerLoading}>
            <SkeletonSetsMobile />
          </div>
        </>
      ) : (
        <>
          {allWok.map((cartProduct) => (
            <div key={cartProduct.id} className={styles.productsContainer}>
              <div className={styles.cartProductImg}>
                <img src={cartProduct.img} alt="cartProductimg" />
              </div>
              <div className={styles.cartProductInfoWrapper}>
                <div className={styles.cartProductInfoContainer}>
                  <div className={styles.cartProductInfoName}>
                    {cartProduct.name}
                  </div>
                  <div className={styles.cartProductInfoInfo}>
                    {cartProduct.info}
                  </div>
                </div>
                <div className={styles.cartProductBuy}>
                  <div className={styles.cartProductBuyPrice}>
                    {cartProduct.price} RUB
                  </div>
                  <div
                    onClick={() => addProductToBasket(cartProduct)}
                    className={styles.cartProductBuyToCart}
                  >
                    В корзину
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
