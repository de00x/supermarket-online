import { SkeletonSetsMobile } from '../../../../../Skeletons'
import { ReactComponent as SortBy } from './img/sortBy.svg'
import { ReactComponent as Pizza } from './img/pizza.svg'
import { ReactComponent as Cart } from './img/cart.svg'
import { IPizzas } from './types/SPizzasM.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import SPizzasService from './services/SPizzas.service'
import SPizzasMControllers from './services/SPizzasMControllers'
import SPizzasStyleControllers from './styles/SPizzasStyleControllers'

export const Middle: FC = (): JSX.Element => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [errNotAuth, setErrNotAuth] = useState(false)
  const [sortFly, setSortFly] = useState(false)
  const [allPizzas, setAllPizzas] = useState<IPizzas[]>([])
  const [sortBy, setSortBy] = useState('Сортировка')
  const isMounted = useRef(false)

  /// controllers ///
  const { addProductToBasket, getDefault, getLess, getMore, items, totalPrice, totalCount } =
    SPizzasMControllers({ allPizzas, setSortBy, setSortFly, setAllPizzas, setErrNotAuth })
  /// controllers ///

  /// useEffects ///
  SPizzasService.GetPizzas(setAllPizzas, setIsLoadingPage, isMounted, items)
  /// useEffects ///

  // styles ///
  const { classSortFlyOpenTextDefault, classSortFlyOpenTextHigh, classSortFlyOpenTextLow } =
    SPizzasStyleControllers({ sortBy })
  // styles ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTextContainer}>
          <div>
            <Pizza />
          </div>
          <div className={styles.headerText}>Пицца</div>
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
          {allPizzas.map((cartProduct) => (
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
