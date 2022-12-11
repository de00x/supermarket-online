import { ReactComponent as OrderIcon } from '../../img/orderLogo.svg'
import { FC } from 'react'
import styles from '../../styles/styles.module.scss'

export const OrdersHistory: FC = (): JSX.Element => {
  return (
    <div className={styles.orderHistoryContainer}>
      <div className={styles.orderHistoryHeader}>
        <OrderIcon /> История заказов
      </div>
      <div className={styles.orderHistoryText}>Вы еще ничего не заказывали</div>
      <div className={styles.orderHistoryBtn}>Показать все заказы</div>
    </div>
  )
}
