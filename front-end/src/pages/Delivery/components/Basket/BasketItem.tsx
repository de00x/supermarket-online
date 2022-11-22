import { ISets } from '../../../SidebarMenuPages/SidebarSets/middleBlock/components/Main/types'
import { addItem, minusItem, removeItem } from '../../../../redux/slices/slice'
import { ReactComponent as BtnMinus } from '../img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from '../img/buttonPlus.svg'
import { useDispatch } from 'react-redux'
import { FC } from 'react'
import styles from './styles.module.scss'

interface BasketItemsProps {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
}

export const BasketItem: FC<BasketItemsProps> = ({ id, img, name, info, price, count }) => {
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
