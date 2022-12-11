import { selectCart } from '../../../../../../redux/slices/selectors'
import { ReactComponent as Rolls } from '../../../img/rolls.svg'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { SkeletonRollsLoading } from './components'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ISets } from './types/SRolls.types'
import styles from './styles/styles.module.scss'
import SRollsService from './services/SRolls.service'
import SRollsControllers from './services/SRollsControllers'
import SRollsStylesControllers from './styles/SRollsStylesControllers'

export const Main: FC = () => {
  const [allRolls, setAllRolls] = useState<ISets[]>([])
  const [sortBy, setSortBy] = useState('По умолчанию')
  const [isLoading, setIsLoading] = useState(true)
  const [sortFly, setSortFly] = useState(false)
  const [errAuth, setErrAuth] = useState(false)
  const { items } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// functions ///
  const { addProductToBasket, getDefault, getLess, getMore } = SRollsControllers({
    setErrAuth,
    setSortBy,
    setSortFly,
    setAllRolls,
    allRolls,
  })
  /// functions ///

  /// useEffects ///
  SRollsService.GetAllRolls(items, isMounted, setAllRolls, setIsLoading)
  /// useEffects ///

  /// styles ///
  const { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed } = SRollsStylesControllers({
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
          <Rolls /> <span>Роллы</span>
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
            {allRolls.map((rolls) => (
              <div key={rolls.id} className={styles.item}>
                <img src={rolls.img} alt="item1" width={'226px'} height={'190px'} />
                <div className={styles.setName}>{rolls.name}</div>
                <div className={styles.buyProduct}>
                  <div>от {rolls.price} ₽</div>
                  <div onClick={() => addProductToBasket(rolls)}>В корзину</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <SkeletonRollsLoading />
        )}
      </div>
    </>
  )
}
