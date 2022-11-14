import { FC, useEffect } from 'react'
import {
  DeliveryInformation,
  Favourites,
  OrderInfo,
  SubscribeToSpam,
  PersonalInfo,
  Logout,
  LockPage,
} from './components'
import styles from './styles.module.scss'

export const Main: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.container}>
      {localStorage.getItem('login') === null ? (
        <LockPage />
      ) : (
        <>
          <div className={styles.personalHeader}>
            Добро пожаловать в личный кабинет, {localStorage.getItem('login')}
          </div>
          <div className={styles.personalBlockContainer}>
            <PersonalInfo />
            <Favourites />
          </div>
          <DeliveryInformation />
          <div className={styles.additionallyBlockContainer}>
            <SubscribeToSpam />
            <OrderInfo />
          </div>
          <Logout />
        </>
      )}
    </div>
  )
}
