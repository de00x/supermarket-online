import { selectCart } from '../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { ReactComponent as WOK } from '../../../img/WOK.svg'
import { SkeletonWokLoading } from './components'
import { FC, useRef, useState } from 'react'
import { IWok } from './types/SWok.types'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import SWokService from './services/SWok.service'
import SWokControllers from './services/SWokControllers'
import SWokStylesControllers from './styles/SWokStylesControllers'

export const Main: FC = () => {
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [allWoks, setAllWok] = useState<IWok[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SWokControllers({
    allWoks,
    setSortBy,
    setAllWok,
    setErrAuth,
    setSortFly,
  })
  /// functions ///

  /// useEffects ///
  SWokService.GetAllWok(isMounted, items, setAllWok, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SWokStylesControllers({
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
