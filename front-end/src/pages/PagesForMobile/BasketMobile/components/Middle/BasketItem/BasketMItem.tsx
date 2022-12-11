import { ReactComponent as BtnDelete } from '../img/buttonDelete.svg'
import { ReactComponent as BtnMinus } from '../img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from '../img/buttonPlus.svg'
import { FC } from 'react'
import styles from '../styles/styles.module.scss'
import { BasketItemsProps } from './types/BasketItem.types'
import BasketIControllers from './service/BasketIControllers'

export const BasketItem: FC<BasketItemsProps> = ({ id, img, name, info, price, count }) => {
  /// controllers ///
  const { minusProduct, plusProduct, deleteProduct } = BasketIControllers({ count })
  /// controllers ///

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.cartItemImg}>
        <img src={img} alt="cartItemImg" />
      </div>
      <div className={styles.cartItemInfoContainer}>
        <div className={styles.cartItemNameAndDelete}>
          <div>{name}</div>
          <div className={styles.btnDelete}>
            <BtnDelete onClick={() => deleteProduct(id)} />
          </div>
        </div>
        <div className={styles.cartItemInfo}>{info}</div>
        <div className={styles.cartItemBuyContainer}>
          <div className={styles.cartItemCountContainer}>
            <BtnMinus onClick={() => minusProduct(id)} />
            <div className={styles.cartItemCount}>{count}</div>
            <BtnPlus onClick={() => plusProduct(id)} />
          </div>
          <div className={styles.cartItemPrice}>{price} RUB</div>
        </div>
      </div>
    </div>
  )
}
