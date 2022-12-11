import { ReactComponent as Beverages } from '../../../img/beverages.svg'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonBeveragesLoading } from './components'
import { IBeverage } from './types/SBeverages.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import SBeveragesService from './services/SBeverages.service'
import SBevStylesControllers from './styles/SBevStylesControllers'
import SBeveragesControllers from './services/SBeveragesControllers'

export const Main: FC = () => {
  const [allBeverages, setAllBeverages] = useState<IBeverage[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SBeveragesControllers({
    setSortBy,
    setErrAuth,
    setSortFly,
    allBeverages,
    setAllBeverages,
  })
  /// functions ///

  /// useEffects ///
  SBeveragesService.GetAllBeverages(setAllBeverages, setIsLoading, isMounted, items)
  /// useEffects ///

  /// styles ///
  const { stylesErrAuth, stylesSort, stylesErrAuthContainerBgdRed } = SBevStylesControllers({
    errAuth,
    sortFly,
  })
  /// styles ///

  return (
    <>
      {localStorage.getItem('login') === null ? (
        <div className={stylesErrAuthContainerBgdRed}>
          <div className={stylesErrAuth}>
            Что бы сделать заказ а
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
            {allBeverages.map((beverage) => (
              <div key={beverage.id} className={styles.item}>
                <img src={beverage.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{beverage.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {beverage.price} ₽</div>
                  <div onClick={() => addProductToBasket(beverage)}>В корзину</div>
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
