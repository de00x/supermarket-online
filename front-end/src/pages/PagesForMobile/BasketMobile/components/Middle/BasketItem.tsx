import { ISets } from '../../../../SidebarMenuPages/SidebarSets/middleBlock/components/Main/types'
import { ReactComponent as BtnDelete } from './img/buttonDelete.svg'
import { ReactComponent as BtnMinus } from './img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from './img/buttonPlus.svg'
import { useDispatch } from 'react-redux'
import { FC } from 'react'
import styles from './styles.module.scss'
import {
  addItem,
  minusItem,
  removeItem,
} from '../../../../../redux/slices/slice'

interface BasketItemsProps {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
}

export const BasketItem: FC<BasketItemsProps> = ({
  id,
  img,
  name,
  info,
  price,
  count,
}) => {
  const dispatch = useDispatch()

  const minusProduct = (id: string): void => {
    if (count === 1) {
      if (window.confirm('Вы дейтсвительно хотите удалить товар?')) {
        dispatch(removeItem(id))
      }
    } else {
      dispatch(minusItem(id))
    }
  }
  const plusProduct = (id: string): void => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    dispatch(addItem({ id } as ISets))
  }
  const deleteProduct = (id: string): any => {
    if (window.confirm('Вы дейтсвительно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }
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
