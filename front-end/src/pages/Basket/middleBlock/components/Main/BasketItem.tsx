import { ReactComponent as BtnDelete } from './img/buttonDelete.svg'
import { ReactComponent as BtnMinus } from './img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from './img/buttonPlus.svg'
import { BasketItemsProps } from './types/BasketItem.types'
import { useDispatch } from 'react-redux'
import { FC } from 'react'
import styles from './styles/styles.module.scss'
import BasketIControllers from './services/BasketIControllers'

export const BasketItem: FC<BasketItemsProps> = ({ id, img, name, info, price, count }) => {
  const dispatch = useDispatch()

  /// functions //
  const { minusProduct, plusProduct, deleteProduct } = BasketIControllers({ count, dispatch })
  /// functions //

  return (
    <>
      <div>
        <div className={styles.item}>
          <div className={styles.itemImg}>
            <img src={img} alt="basketItemimg" width={'130px'} height={'100px'} />
          </div>
          <div className={styles.productInfo}>
            <div>{name}</div>
            <div>{info}</div>
          </div>
          <div className={styles.currentCount}>
            <button onClick={() => minusProduct(id)}>
              <BtnMinus />
            </button>
            <div>{count}</div>
            <button onClick={() => plusProduct(id)}>
              <BtnPlus />
            </button>
          </div>
          <div className={styles.itemPrice}>{price}</div>
          <button onClick={() => deleteProduct(id)} className={styles.deleteProduct}>
            <BtnDelete />
          </button>
        </div>
      </div>
    </>
  )
}
