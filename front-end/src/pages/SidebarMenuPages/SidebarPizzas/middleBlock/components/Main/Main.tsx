import { selectCart } from '../../../../../../redux/slices/selectors'
import { SortByTypeAndSize } from './components/SortByTypeAndSize'
import { ReactComponent as Pizza } from '../../../img/pizza.svg'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonPizzasLoading } from './components'
import { IPizzas } from './types/SPizzas.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import SPizzasService from './services/SPizzas.service'
import SPizzasControllers from './services/SPizzasControllers'
import SPizzasStylesControllers from './styles/SPizzasStylesControllers'

export const Main: FC = () => {
  const [allPizzas, setAllPizzas] = useState<IPizzas[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SPizzasControllers({
    allPizzas,
    setSortBy,
    setSortFly,
    setErrAuth,
    setAllPizzas,
  })
  /// functions ///

  /// useEffects ///
  SPizzasService.GetAllPizzas(isMounted, items, setAllPizzas, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SPizzasStylesControllers({
    sortFly,
    errAuth,
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
