import { selectCart } from '../../../../../redux/slices/selectors'
import { ReactComponent as BtnMinus } from './img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from './img/buttonPlus.svg'
import { useAppSelector } from '../../../../../hooks/hooks'
import { ReactComponent as Card } from './img/inCash.svg'
import { ReactComponent as Cash } from './img/card.svg'
import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Middle: FC = (): JSX.Element => {
  const [whatDelivery, setWhatDelivery] = useState('')
  const [whatPayment, setWhatPayment] = useState('')
  const [deliveryOn, setDeliveryOn] = useState('')
  const [isCashback, setIsCashback] = useState(false)
  const [devicesCounter, setDevicesCounter] = useState(0)
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /// styles ///
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
  /// styles ///

  /// onClick ///
  const onClickCourier = (): void => {
    setWhatDelivery('Курьером')
  }
  const onClickForTime = (): void => {
    setDeliveryOn('Время')
  }
  const onClickPickup = (): void => {
    setWhatDelivery('Самовывоз')
  }
  const onClickInCash = (): void => {
    setWhatPayment('Наличными')
  }
  const onClickInCard = (): void => {
    setWhatPayment('Картой')
  }
  const onClickForNow = (): void => {
    setDeliveryOn('Сейчас')
  }
  const onClickCashback = (): void => {
    setIsCashback(!isCashback)
  }
  const onClickDevicesMinus = (): number | null => {
    if (devicesCounter !== 0) {
      setDevicesCounter(devicesCounter - 1)
    }
    return null
  }
  const onClickDevicesPlus = (): void => {
    setDevicesCounter(devicesCounter + 1)
  }
  /// onClick ///

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
          <input
            className={styles.currentAddressEntrance}
            placeholder="Подьезд"
          />
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
          <input
            className={styles.isCashbackInput}
            placeholder="Сумма"
            disabled={!isCashback}
          />
        </div>
        <input
          className={styles.additionallyEmail}
          placeholder="E-mail(необязательно)"
        />
        <input
          className={styles.additionallyComment}
          placeholder="Комментарий к заказу"
        />
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
            <div
              onClick={onClickDevicesMinus}
              className={styles.devicesCountMinus}
            >
              <BtnMinus />
            </div>
            <div className={styles.devicesCounter}>{devicesCounter}</div>
            <div
              onClick={onClickDevicesPlus}
              className={styles.devicesCountPlus}
            >
              <BtnPlus />
            </div>
          </div>
        </div>
        <input
          className={styles.inputPromocode}
          placeholder="Введите промокод"
        />
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
