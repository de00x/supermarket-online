import { ReactComponent as CornDogs } from './img/cornDogs.svg'
import { SkeletonSetsMobile } from '../../../../../Skeletons'
import { ReactComponent as SortBy } from './img/sortBy.svg'
import { ReactComponent as Cart } from './img/cart.svg'
import { ICornDogs } from './types/CDogsM.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import CDogsService from './services/CDogs.service'
import CDogsMControllers from './services/CDogsMControllers'
import CDogsStyleControllers from './styles/CDogsStyleControllers'

export const Middle: FC = (): JSX.Element => {
  const [allCornDogs, setAllCornDogs] = useState<ICornDogs[]>([])
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [errNotAuth, setErrNotAuth] = useState(false)
  const [sortBy, setSortBy] = useState('Сортировка')
  const [sortFly, setSortFly] = useState(false)
  const isMounted = useRef(false)

  /// controllers ///
  const { addProductToBasket, getDefault, getLess, getMore, totalPrice, totalCount, items } =
    CDogsMControllers({
      setSortBy,
      setSortFly,
      allCornDogs,
      setErrNotAuth,
      setAllCornDogs,
    })
  /// controllers ///

  /// useEffects ///
  CDogsService.GetCornDogs(setAllCornDogs, setIsLoadingPage, isMounted, items)
  /// useEffects ///

  // styles ///
  const { classSortFlyOpenTextDefault, classSortFlyOpenTextHigh, classSortFlyOpenTextLow } =
    CDogsStyleControllers({ sortBy })
  // styles ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTextContainer}>
          <div>
            <CornDogs />
          </div>
          <div className={styles.headerText}>Корн Доги</div>
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
          {allCornDogs.map((cartProduct) => (
            <div key={cartProduct.id} className={styles.productsContainer}>
              <div className={styles.cartProductImg}>
                <img src={cartProduct.img} alt="cartProductimg" />
              </div>
              <div className={styles.cartProductInfoWrapper}>
                <div className={styles.cartProductInfoContainer}>
                  <div className={styles.cartProductInfoName}>{cartProduct.name}</div>
                  <div className={styles.cartProductInfoInfo}>{cartProduct.info}</div>
                </div>
                <div className={styles.cartProductBuy}>
                  <div className={styles.cartProductBuyPrice}>{cartProduct.price} RUB</div>
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
