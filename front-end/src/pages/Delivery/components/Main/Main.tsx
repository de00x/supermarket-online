import { ReactComponent as Clock } from '../img/wallClock.svg'
import { ReactComponent as Card } from '../img/inCash.svg'
import { ReactComponent as Cash } from '../img/card.svg'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = (): JSX.Element => {
  const [additionallyCount, setAdditionallyCount] = useState(0)
  const [isCashback, setIsCashback] = useState(false)
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryOn, setDeliveryOn] = useState('')
  const [paymentBy, setPaymentBy] = useState('')

  /// onClick ///
  const minusAdditionallyCount = (): void => {
    if (additionallyCount > 0) {
      setAdditionallyCount(additionallyCount - 1)
    }
  }
  /// onClick ///

  // styles ///
  const stylesDeliveryByCourier = cn(styles.deliveryByCourier, {
    [styles.deliveryByActive]: deliveryBy === 'Курьером',
  })
  const stylesDeliveryByPickup = cn(styles.deliveryByPickup, {
    [styles.deliveryByActive]: deliveryBy === 'Самовывоз',
  })
  const stylesDeliveryOnTime = cn(styles.onTime, {
    [styles.deliveryOnActive]: deliveryOn === 'На время',
  })
  const stylesPaymentByInCash = cn(styles.inCash, {
    [styles.paymentByActive]: paymentBy === 'Наличными',
  })
  const stylesDeliveryOnNow = cn(styles.onNow, {
    [styles.deliveryOnActive]: deliveryOn === 'На сейчас',
  })
  const stylesPaymentByCard = cn(styles.inCard, {
    [styles.paymentByActive]: paymentBy === 'Картой',
  })
  const stylesIsCashback = cn(styles.cashbackWith, {
    [styles.cashbackWithActive]: isCashback,
  })
  // styles ///

  return (
    <>
      <div className={styles.headerContainer}>
        <Link to={'/main'}>
          <div className={styles.headerBtn}>
            <span>{'<'}</span> Продолжить выбор
          </div>
        </Link>
        <div className={styles.headerContacts}>
          <div>Наш телефон</div>
          <div>+7 999 222 88 66</div>
          <div>+7 999 777 22 77</div>
          <div>
            <Clock /> работаем с 10:00 до 00:00
          </div>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>Ваши данные</div>
        <div className={styles.formContainer}>
          <div className={styles.formLeft}>
            <div className={styles.formLeftContacts}>
              <input placeholder="Телефон" />
              <input placeholder="Имя" />
            </div>
            <div className={styles.formLeftPaymentBy}>
              <div
                onClick={() => setPaymentBy('Наличными')}
                className={stylesPaymentByInCash}
              >
                <Card /> Наличными
              </div>
              <div
                onClick={() => setPaymentBy('Картой')}
                className={stylesPaymentByCard}
              >
                <Cash /> Картой
              </div>
            </div>
            <div className={stylesIsCashback}>
              <div onClick={() => setIsCashback(!isCashback)}>✓</div>
              <div>Подготовить сдачу с</div>
              <input disabled={!isCashback} placeholder="Сумма" />
            </div>
            <input
              placeholder="Комментарий к заказу"
              className={styles.commentary}
            />
            <div className={styles.additionallyContainer}>
              <div className={styles.additionallyText}>
                Палочки + соусник обычные
              </div>
              <div className={styles.additionallyCounterContainer}>
                <div
                  className={styles.additionallyMinus}
                  onClick={() => minusAdditionallyCount()}
                >
                  -
                </div>
                <div className={styles.additionallyCount}>
                  {additionallyCount}
                </div>
                <div
                  className={styles.additionallyPlus}
                  onClick={() => setAdditionallyCount(additionallyCount + 1)}
                >
                  +
                </div>
              </div>
            </div>
            <input
              className={styles.promocode}
              placeholder="Введите промокод"
            />
          </div>
          <div className={styles.formRight}>
            <div className={styles.whatDelivery}>
              <div
                onClick={() => setDeliveryBy('Курьером')}
                className={stylesDeliveryByCourier}
              >
                Курьером
              </div>
              <div
                onClick={() => setDeliveryBy('Самовывоз')}
                className={stylesDeliveryByPickup}
              >
                Самовывоз
              </div>
            </div>
            <div className={styles.address}>
              <input className={styles.street} placeholder="Улица" />
              <input className={styles.home} placeholder="Дом" />
            </div>
            <div className={styles.currentAddress}>
              <input placeholder="Кв" />
              <input placeholder="Подъезд" />
              <input placeholder="Этаж" />
              <input placeholder="Код" />
            </div>
            <div className={styles.deliveryOn}>
              <div
                onClick={() => setDeliveryOn('На сейчас')}
                className={stylesDeliveryOnNow}
              >
                На сейчас
              </div>
              <div
                onClick={() => setDeliveryOn('На время')}
                className={stylesDeliveryOnTime}
              >
                На время
              </div>
            </div>
            <input
              className={styles.email}
              placeholder="E-mail(необязательно)"
            />
          </div>
        </div>
        <div className={styles.placeAnOrder}>Оформить заказ</div>
        <div className={styles.footerContainer}>
          <div>
            Нажимая на кнопку Оформить заказ, Вы подтверждаете свое согласие на
            обработку персональных данных
          </div>
          <div>
            в соответствии с <span>Публичной оффертой</span>
          </div>
        </div>
      </div>
    </>
  )
}
