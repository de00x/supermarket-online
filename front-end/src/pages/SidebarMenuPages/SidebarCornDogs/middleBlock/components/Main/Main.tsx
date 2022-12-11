import { ReactComponent as CornDogs } from '../../../img/cornDogs.svg'
import { selectCart } from '../../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonCornDogLoading } from './components'
import { ICornDog } from './types/SCornDogs.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import SCornDogsService from './services/SCornDogs.service'
import SCornDogsControllers from './services/SCornDogsControllers'
import SCDogsStylesControllers from './styles/SCDogsStylesControllers'

export const Main: FC = () => {
  const [allCornDogs, setAllCornDogs] = useState<ICornDog[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SCornDogsControllers({
    setSortBy,
    setErrAuth,
    setSortFly,
    allCornDogs,
    setAllCornDogs,
  })
  /// functions ///

  /// useEffects ///
  SCornDogsService.SetProductLS(isMounted, items)
  SCornDogsService.GetAllCornDogs(setAllCornDogs, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SCDogsStylesControllers({
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
          <CornDogs /> <span>Кор Доги</span>
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
            {allCornDogs.map((cornDog) => (
              <div key={cornDog.id} className={styles.item}>
                <img src={cornDog.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{cornDog.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {cornDog.price} ₽</div>
                  <div onClick={() => addProductToBasket(cornDog)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonCornDogLoading />
        )}
      </div>
    </>
  )
}
