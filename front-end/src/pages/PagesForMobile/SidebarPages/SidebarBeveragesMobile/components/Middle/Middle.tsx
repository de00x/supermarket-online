import { ReactComponent as Beverages } from './img/beverages.svg'
import { SkeletonSetsMobile } from '../../../../../Skeletons'
import { ReactComponent as SortBy } from './img/sortBy.svg'
import { ReactComponent as Cart } from './img/cart.svg'
import { IBeverages } from './types/SBeveragesM.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import SBevMService from './services/SBevM.service'
import SBevMControllers from './services/SBevMControllers'
import SBevMSControllers from './styles/SBevMSControllers'

export const Middle: FC = (): JSX.Element => {
  const [allBeverages, setAllBeverages] = useState<IBeverages[]>([])
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [errNotAuth, setErrNotAuth] = useState(false)
  const [sortBy, setSortBy] = useState('Сортировка')
  const [sortFly, setSortFly] = useState(false)
  const isMounted = useRef(false)

  /// controllers ///
  const { addProductToBasket, getDefault, getLess, getMore, totalPrice, totalCount, items } =
    SBevMControllers({
      setSortBy,
      setSortFly,
      allBeverages,
      setErrNotAuth,
      setAllBeverages,
    })
  /// controllers ///

  /// useEffects ///
  SBevMService.GetBeverages(setAllBeverages, setIsLoadingPage, isMounted, items)
  /// useEffects ///

  // styles ///
  const { classSortFlyOpenTextDefault, classSortFlyOpenTextHigh, classSortFlyOpenTextLow } =
    SBevMSControllers({ sortBy })
  // styles ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTextContainer}>
          <div>
            <Beverages />
          </div>
          <div className={styles.headerText}>Напитки</div>
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
          {allBeverages.map((cartProduct) => (
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
