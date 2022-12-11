import { ReactComponent as BtnMinus } from '../img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from '../img/buttonPlus.svg'
import { BasketItemsProps } from './types/Basket.types'
import { useDispatch } from 'react-redux'
import { FC } from 'react'
import styles from './styles/styles.module.scss'
import DBasketControllers from './services/DBasketControllers'

export const BasketItem: FC<BasketItemsProps> = ({ id, img, name, info, price, count }) => {
  const dispatch = useDispatch()

  /// functions ///
  const { minusProduct, plusProduct } = DBasketControllers({ count, dispatch })
  /// functions ///

  return (
    <>
      <div className={styles.basketItem}>
        <div className={styles.basketItemImg}>
          <img src={img} alt={`basketImg ${name}`} />
        </div>
        <div className={styles.basketItemInfoWrapper}>
          <div className={styles.basketItemName}>{name}</div>
          <div className={styles.basketItemInfoContainer}>
            <div className={styles.basketItemCount}>
              <div onClick={() => minusProduct(id)} className={styles.btnMinus}>
                <BtnMinus />
              </div>
              <div>{count}</div>
              <div onClick={() => plusProduct(id)} className={styles.btnPlus}>
                <BtnPlus />
              </div>
            </div>
            <div className={styles.basketItemPrice}>{price} RUB</div>
          </div>
        </div>
      </div>
    </>
  )
}
