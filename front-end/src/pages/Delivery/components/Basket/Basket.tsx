import { selectCart } from '../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../hooks/hooks'
import { BasketItem } from './BasketItem'
import { FC } from 'react'
import styles from './styles.module.scss'

export const Basket: FC = (): JSX.Element => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

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
