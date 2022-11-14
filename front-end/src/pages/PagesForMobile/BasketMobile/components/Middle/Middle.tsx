import { selectCart } from '../../../../../redux/slices/selectors'
import { clearItems } from '../../../../../redux/slices/slice'
import { useAppSelector } from '../../../../../hooks/hooks'
import { FC, useEffect, useRef, useState } from 'react'
import basketClearImg from './img/basketImg.webp'
import { BasketItem } from './BasketItem'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const Middle: FC = (): JSX.Element => {
  const [accessClearAllItem, setAccessClearAllItem] = useState(false)
  const { items, totalPrice } = useAppSelector(selectCart)
  const dispatch = useDispatch()
  const isMounted = useRef(false)
  const clearAllProducts = (): void => {
    dispatch(clearItems())
  }
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

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
          <div
            onClick={() => setAccessClearAllItem(true)}
            className={styles.clearBasket}
          >
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
            <div>
              Для того, чтобы сделать заказ, перейдите на главную страницу.
            </div>
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
