import { Delivery, Favourites, Logout, OrdersHistory, PersonalInfo, Subscribe } from './components'
import { FC } from 'react'
import styles from './styles.module.scss'

export const Middle: FC = (): JSX.Element => {
  const isAuth = (): boolean => {
    if (localStorage.getItem('login') !== null) {
      return true
    }
    return false
  }

  return (
    <div className={styles.middleContainer}>
      {isAuth() ? (
        <>
          <div className={styles.headerText}>
            Добро пожаловать в личный кабинет, {localStorage.getItem('login')}
          </div>
          <PersonalInfo />
          <Favourites />
          <Delivery />
          <Subscribe />
          <OrdersHistory />
          <Logout />
        </>
      ) : (
        <div className={styles.notAuthorizationText}>
          Для того что бы зайти в личный кабинет
          <div>Вам нужно авторизоваться.</div>
        </div>
      )}
    </div>
  )
}
