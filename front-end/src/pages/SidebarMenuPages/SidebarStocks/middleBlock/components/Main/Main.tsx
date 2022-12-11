import { selectCart } from '../../../../../../redux/slices/selectors'
import { ReactComponent as Stocks } from '../../../img/stocks.svg'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonStocksLoading } from './components'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IStocks } from './types/SStocks.types'
import styles from './styles/styles.module.scss'
import SStocksService from './services/SStocks.service'
import SStocksControllers from './services/SStocksControllers'
import SStocksStylesControllers from './styles/SStocksStylesControllers'

export const Main: FC = () => {
  const [allStocks, setAllStocks] = useState<IStocks[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SStocksControllers({
    allStocks,
    setSortBy,
    setSortFly,
    setErrAuth,
    setAllStocks,
  })
  /// functions ///

  /// useEffects ///
  SStocksService.GetAllStocks(isMounted, items, setAllStocks, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SStocksStylesControllers({
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
          <Stocks /> <span>Акции</span>
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
            {allStocks.map((stocks) => (
              <div key={stocks.id} className={styles.item}>
                <img src={stocks.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{stocks.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {stocks.price} ₽</div>
                  <div onClick={() => addProductToBasket(stocks)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonStocksLoading />
        )}
      </div>
    </>
  )
}
