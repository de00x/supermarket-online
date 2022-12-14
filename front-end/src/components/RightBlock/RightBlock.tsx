import { ReactComponent as PersonalLogo } from './img/personalCardLogo.svg'
import { ReactComponent as Geolocation } from './img/geolocation.svg'
import { ReactComponent as Ellipse } from './img/ellipse.svg'
import { selectCart } from '../../redux/slices/selectors'
import { ReactComponent as Cart } from './img/cart.svg'
import { useAppSelector } from '../../hooks/hooks'
import { Login } from '../../pages/Login'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import map from './img/mapDelivery.png'
import styles from './styles/styles.module.scss'
import RBStylesControllers from './styles/RBStylesControllers'
import RightBControllers from './controllers/RightBControllers'

export const RightBlock: FC = () => {
  const [confirmationOutAccount, setConfirmationOutAccount] = useState(false)
  const [blockAuthorization, setBlockAuthorization] = useState(false)
  const { items, totalPrice } = useAppSelector(selectCart)
  const dispatch = useDispatch()
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  /// functions ///
  const { logOutFromAccount, logOutCancel, logOutYes, isAuth } = RightBControllers({
    setConfirmationOutAccount,
    dispatch,
  })
  /// functions ///

  /// styles ///
  const { stylesPersonalContainer, stylesLoginOffRightBlock } = RBStylesControllers({ isAuth })
  /// styles ///

  return (
    <>
      <div className={styles.rightBlockContainer}>
        <div className={stylesPersonalContainer}>
          {localStorage.getItem('login') != null && (
            <div className={styles.personalAreaContainer}>
              <div className={styles.personalCard}>
                <div className={styles.personalCardLogo}>
                  <PersonalLogo />
                </div>
                <div className={styles.currentUserLogin}>
                  {localStorage.getItem('login')}
                  <div>Мы снова рады вас видеть!</div>
                </div>
                <Link to={'/personal'}>
                  <div className={styles.goToPersonalCard}>Перейти в личный кабинет</div>
                </Link>
                {!confirmationOutAccount ? (
                  <div onClick={logOutFromAccount} className={styles.logOutFromAccount}>
                    Выйти из аккаунта
                  </div>
                ) : (
                  <div className={styles.confirmationForAccount}>
                    <div onClick={logOutYes} className={styles.confirmationYes}>
                      Подтвердить
                    </div>
                    <div onClick={logOutCancel} className={styles.confirmationNo}>
                      Отмена
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {localStorage.getItem('login') != null && (
            <>
              <div className={styles.cartContainer}>
                <Link to={'/basket'}>
                  <div className={styles.cart}>
                    <div>{totalPrice} ₽</div>
                    <div>
                      <Cart /> {totalCount}
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
          {localStorage.getItem('login') == null && (
            <>
              <div className={styles.personalTextOne}>Что бы сделать заказ</div>
              <div className={styles.personalTextTwo}>
                Вам необходимо
                <span onClick={() => setBlockAuthorization(!blockAuthorization)}>
                  авторизоваться
                </span>
              </div>
              {blockAuthorization && (
                <>
                  <div className={stylesLoginOffRightBlock}>
                    <Login setBlockAuthorization={setBlockAuthorization} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {localStorage.getItem('login') == null && (
          <>
            <div className={styles.basket}>
              <div>Ваша корзина пуста.</div>
              <div>Добавьте же скорее что-нибудь!</div>
            </div>
            <div className={styles.freeDelivery}>Бесплатная доставка от 800СОМ</div>
          </>
        )}

        <div className={styles.delivery}>
          <img src={map} alt="mapDelivery" />
          <div className={styles.deliveryBgd}>
            <div className={styles.deliveryImg}>
              <Geolocation />
              <Ellipse />
            </div>
            <div className={styles.deliveryAddress}>Укажите адрес</div>
            <div className={styles.deliveryTime}>И узнайте время доставки</div>
          </div>
        </div>
      </div>
    </>
  )
}
