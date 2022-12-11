import { BasketItem } from './BasketItem'
import { FC } from 'react'
import styles from './styles/styles.module.scss'
import BasketControllers from './services/BasketControllers'

export const Basket: FC = (): JSX.Element => {
  const { totalCount, items, totalPrice } = BasketControllers()
  return (
    <>
      <div className={styles.basketContainer}>
        <div className={styles.basketHeaderText}>Корзина</div>
        {items.map((basketItem) => (
          <BasketItem key={basketItem.id} {...basketItem} />
        ))}
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.resultProduct}>
          <div>Всего позиций : {totalCount}</div>
          <div>{totalPrice} RUB</div>
        </div>
        <div className={styles.resultDiscount}>
          <div>Скидка</div>
          <div>0 RUB</div>
        </div>
        <div className={styles.resultDelivery}>
          <div>Доставка</div>
          <div>Бесплатно</div>
        </div>
        <div className={styles.resultFull}>
          <div>Итого</div>
          <div>{totalPrice} RUB</div>
        </div>
      </div>
    </>
  )
}
