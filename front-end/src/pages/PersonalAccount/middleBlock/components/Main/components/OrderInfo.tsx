import { ReactComponent as OrderLogo } from '../img/orderLogo.svg'
import { FC } from 'react'
import styles from '../styles.module.scss'

export const OrderInfo: FC = () => {
  return (
    <div className={styles.orderInfoContainer}>
      <div className={styles.orderInfo}>
        <OrderLogo /> История заказов
      </div>
      <div className={styles.orderText}>Вы еще ничего не заказывали</div>
      <div className={styles.viewAllOrders}>Показать все заказы</div>
    </div>
  )
}
