import { selectCart } from '../../../../../../redux/slices/selectors'
import { ReactComponent as Sushi } from '../../../img/sushi.svg'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonSushiLoading } from './components'
import { ISushi } from './types/SSushi.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import SSushiService from './services/SSushi.service'
import SSushiControllers from './services/SSushiControllers'
import SSushiStylesControllers from './styles/SSushiStylesControllers'

export const Main: FC = () => {
  const [allSushi, setAllSushi] = useState<ISushi[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SSushiControllers({
    allSushi,
    setSortBy,
    setErrAuth,
    setSortFly,
    setAllSushi,
  })
  /// functions ///

  /// useEffects ///
  SSushiService.GetAllSushi(isMounted, items, setAllSushi, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SSushiStylesControllers({
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
          <Sushi /> <span>Суши</span>
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
            {allSushi.map((sushi) => (
              <div key={sushi.id} className={styles.item}>
                <img src={sushi.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{sushi.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {sushi.price} ₽</div>
                  <div onClick={() => addProductToBasket(sushi)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonSushiLoading />
        )}
      </div>
    </>
  )
}
