import { selectCart } from '../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../hooks/hooks'
import { BasketItem } from './BasketItem/BasketMItem'
import basketClearImg from './img/basketImg.webp'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import BasketMService from './services/BasketM.service'
import BasketMControllers from './services/BasketMControllers'

export const Middle: FC = (): JSX.Element => {
  const [accessClearAllItem, setAccessClearAllItem] = useState(false)
  const { items, totalPrice } = useAppSelector(selectCart)
  const isMounted = useRef(false)

  /// controllers ///
  const { totalCount, clearAllProducts } = BasketMControllers({ items })
  /// controllers ///

  /// useEffects ///
  BasketMService.GetItemLS(isMounted, items)
  /// useEffects ///

  return (
    <>
      {totalPrice !== 0 ? (
        <div className={styles.middleContainer}>
          <div className={styles.header}>Корзина</div>
          {items.map((basketItem) => (
            <BasketItem key={basketItem.id} {...basketItem} />
          ))}
          <div className={styles.totalContainer}>
            <div className={styles.totalHeader}>Итого</div>
            <div className={styles.totalProductContainer}>
              <div>Всего позиций : {totalCount}</div>
              <div>{totalPrice} RUB</div>
            </div>
            <div className={styles.totalDiscountContainer}>
              <div>Скидка</div>
              <div>0 RUB</div>
            </div>
            <div className={styles.totalDeliveryContainer}>
              <div>Доставка</div>
              <div>Бесплатно</div>
            </div>
          </div>
          {accessClearAllItem && (
            <div className={styles.accessClearAllItem}>
              Вы дейтсвительно хотите очистить всю корзину?
              <div>Все продукты будут удалены.</div>
              <div className={styles.accessBtnContainer}>
                <div onClick={() => clearAllProducts()}>Удалить</div>
                <div onClick={() => setAccessClearAllItem(false)}>Отмена</div>
              </div>
            </div>
          )}
          <div onClick={() => setAccessClearAllItem(true)} className={styles.clearBasket}>
            Очистить всю корзину
          </div>
          <Link to={'/delivery'}>
            <div className={styles.delivery}>Оформить заказ</div>
          </Link>
        </div>
      ) : (
        <div className={styles.basketClearContainer}>
          <div className={styles.basketClearHeader}>Корзина пустая 😕</div>
          <div className={styles.basketClearText}>
            Вероятнее всего, вы еще ничего не заказывали.
            <div>Для того, чтобы сделать заказ, перейдите на главную страницу.</div>
          </div>
          <div className={styles.basketClearImg}>
            <img src={basketClearImg} alt="basketClearImg" />
          </div>
          <div className={styles.basketClearNavigateContainer}>
            <Link to={'/main'}>
              <div className={styles.basketClearNavigate}>За покупками</div>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
