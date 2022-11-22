import { selectCart } from '../../../../../redux/slices/selectors'
import { clearItems } from '../../../../../redux/slices/slice'
import { useAppSelector } from '../../../../../hooks/hooks'
import { ReactComponent as Trash } from './img/trash.svg'
import { ReactComponent as Cart } from './img/cart.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FC, useEffect, useRef } from 'react'
import { BasketItem } from './BasketItem'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import basketImg from './img/basketImg.webp'

export const Main: FC = () => {
  const dispatch = useDispatch()
  const isMounted = useRef(false)
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('location', 'basket')
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  /// onClick ///
  const clearAllProducts = (): void => {
    if (window.confirm('Очистить всю корзину?')) {
      dispatch(clearItems())
    }
  }
  /// onClick ///

  return (
    <div className={styles.container}>
      {totalPrice !== 0 ? (
        <>
          <div className={styles.cartContainer}>
            <div className={styles.cartHeader}>
              <div>
                <Cart className={styles.cartImg} /> Корзина
              </div>
              <div onClick={clearAllProducts}>
                <Trash className={styles.clearCart} /> Очистить корзину
              </div>
            </div>
            {items.map((basketItem) => (
              <BasketItem key={basketItem.id} {...basketItem} />
            ))}
            <div className={styles.itemInfo}>
              <div>
                Количество позиций: <span>{totalCount} шт.</span>
              </div>
              <div>
                Сумма заказа: <span>{totalPrice} ₽</span>
              </div>
            </div>
            <div className={styles.footerBtnContainer}>
              <div className={styles.backToMain} onClick={() => navigate('/main')}>
                ❮ Вернуться на главную
              </div>
              <Link to={'/delivery'}>
                <div className={styles.paymentNow}>Перейти к оплате</div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.main}>
            <div>Корзина пустая 😕</div>
            <div>Вероятнее всего, вы еще ничего не заказывали.</div>
            <div>Для того, чтобы сделать заказ, перейдите на главную страницу.</div>
            <div>
              <img src={basketImg} alt="basketImg" />
            </div>
            <div>
              <Link to={'/main'}> За покупками!</Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
