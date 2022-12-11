import { IDMStylesControllersProps } from '../types/DeliveryM.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const DeliveryMStylesControllers = ({
  whatDelivery,
  whatPayment,
  deliveryOn,
  isCashback,
}: IDMStylesControllersProps) => {
  const stylesDeliveryByCourier = cn(styles.deliveryByCourier, {
    [styles.deliveryByActive]: whatDelivery === 'Курьером',
  })
  const stylesDeliveryByPickup = cn(styles.deliveryByPickup, {
    [styles.deliveryByActive]: whatDelivery === 'Самовывоз',
  })
  const stylesPaymentByInCash = cn(styles.paymentByInCash, {
    [styles.deliveryByActive]: whatPayment === 'Наличными',
  })
  const stylesPaymentByCard = cn(styles.paymentByCard, {
    [styles.deliveryByActive]: whatPayment === 'Картой',
  })
  const deliveryForNow = cn(styles.deliveryForNow, {
    [styles.deliveryOnActive]: deliveryOn === 'Сейчас',
  })
  const deliveryForTime = cn(styles.deliveryForTime, {
    [styles.deliveryOnActive]: deliveryOn === 'Время',
  })
  const stylesToggleCashback = cn(styles.toggleCashback, {
    [styles.toggleCashbackActive]: isCashback,
  })
  return {
    deliveryForNow,
    deliveryForTime,
    stylesPaymentByCard,
    stylesToggleCashback,
    stylesPaymentByInCash,
    stylesDeliveryByPickup,
    stylesDeliveryByCourier,
  }
}
export default DeliveryMStylesControllers
