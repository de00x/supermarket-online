import { ReactComponent as BtnMinus } from './img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from './img/buttonPlus.svg'
import { ReactComponent as Card } from './img/inCash.svg'
import { ReactComponent as Cash } from './img/card.svg'
import { FC, useEffect, useState } from 'react'
import styles from './styles/styles.module.scss'
import DeliveryMControllers from './services/DeliveryMControllers'
import DeliveryMStylesControllers from './styles/DeliveryMStylesControllers'

export const Middle: FC = (): JSX.Element => {
  const [whatDelivery, setWhatDelivery] = useState('')
  const [whatPayment, setWhatPayment] = useState('')
  const [deliveryOn, setDeliveryOn] = useState('')
  const [isCashback, setIsCashback] = useState(false)
  const [devicesCounter, setDevicesCounter] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /// styles ///
  const {
    deliveryForNow,
    deliveryForTime,
    stylesPaymentByCard,
    stylesToggleCashback,
    stylesPaymentByInCash,
    stylesDeliveryByPickup,
    stylesDeliveryByCourier,
  } = DeliveryMStylesControllers({
    isCashback,
    deliveryOn,
    whatPayment,
    whatDelivery,
  })
  /// styles ///

  /// controllers ///
  const {
    totalPrice,
    totalCount,
    onClickPickup,
    onClickInCash,
    onClickInCard,
    onClickForNow,
    onClickCourier,
    onClickForTime,
    onClickCashback,
    onClickDevicesPlus,
    onClickDevicesMinus,
  } = DeliveryMControllers({
    isCashback,
    setDeliveryOn,
    setIsCashback,
    setWhatPayment,
    devicesCounter,
    setWhatDelivery,
    setDevicesCounter,
  })
  /// controllers ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.middleHeader}>Ваши данные</div>
      <div className={styles.dataForm}>
        <div className={styles.dataName}>
          <input className={styles.dataLastName} placeholder="Фамилия" />
          <input className={styles.dataFirstName} placeholder="Имя" />
        </div>
        <div className={styles.whatDelivery}>
          <div onClick={onClickCourier} className={stylesDeliveryByCourier}>
            Курьером
          </div>
          <div onClick={onClickPickup} className={stylesDeliveryByPickup}>
            Самовывоз
          </div>
        </div>
        <input className={styles.addressStreet} placeholder="Улица" />
        <input className={styles.addressHome} placeholder="Дом" />
        <div className={styles.currentAddress}>
          <input className={styles.currentAddressFlat} placeholder="Кв" />
          <input className={styles.currentAddressEntrance} placeholder="Подьезд" />
        </div>
        <div className={styles.currentAddressAdditionally}>
          <input className={styles.currentAddressFloor} placeholder="Этаж" />
          <input className={styles.currentAddressCode} placeholder="Код" />
        </div>
        <div className={styles.whatPayment}>
          <div onClick={onClickInCash} className={stylesPaymentByInCash}>
            <Card /> Наличными
          </div>
          <div onClick={onClickInCard} className={stylesPaymentByCard}>
            <Cash /> Картой
          </div>
        </div>
        <div className={styles.isCashback}>
          <div onClick={onClickCashback} className={stylesToggleCashback}>
            ✓
          </div>
          <div className={styles.isCashbackText}>Подготовить сдачу с</div>
          <input className={styles.isCashbackInput} placeholder="Сумма" disabled={!isCashback} />
        </div>
        <input className={styles.additionallyEmail} placeholder="E-mail(необязательно)" />
        <input className={styles.additionallyComment} placeholder="Комментарий к заказу" />
        <div className={styles.deliveryOn}>
          <div onClick={onClickForNow} className={deliveryForNow}>
            На сейчас
          </div>
          <div onClick={onClickForTime} className={deliveryForTime}>
            На время
          </div>
        </div>
        <div className={styles.additionallyDevices}>
          <div className={styles.devicesText}>Палочки + соусник обычные</div>
          <div className={styles.devicesCountContainer}>
            <div onClick={onClickDevicesMinus} className={styles.devicesCountMinus}>
              <BtnMinus />
            </div>
            <div className={styles.devicesCounter}>{devicesCounter}</div>
            <div onClick={onClickDevicesPlus} className={styles.devicesCountPlus}>
              <BtnPlus />
            </div>
          </div>
        </div>
        <input className={styles.inputPromocode} placeholder="Введите промокод" />
        <div className={styles.footerTotalPriceContainer}>
          <div className={styles.footerTotalProduct}>
            <div>Всего позиций: {totalCount}</div>
            <div>{totalPrice} RUB</div>
          </div>
          <div className={styles.footerDiscount}>
            <div>Скидка</div>
            <div>0 RUB</div>
          </div>
          <div className={styles.footerDelivery}>
            <div>Доставка</div>
            <div>Бесплатно</div>
          </div>
          <div className={styles.footerTotalPrice}>
            <div>Итого</div>
            <div>{totalPrice} RUB</div>
          </div>
        </div>
        <div className={styles.placeAnOrder}>Оформить заказ</div>
      </div>
    </div>
  )
}
