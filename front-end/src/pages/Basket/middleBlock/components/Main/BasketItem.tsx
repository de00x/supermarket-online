import { ISets } from '../../../../SidebarMenuPages/SidebarSets/middleBlock/components/Main/types'
import { ReactComponent as BtnDelete } from './img/buttonDelete.svg'
import { ReactComponent as BtnMinus } from './img/buttonMinus.svg'
import { ReactComponent as BtnPlus } from './img/buttonPlus.svg'
import { FC } from 'react'
import styles from './styles.module.scss'
import { addItem, minusItem, removeItem } from '../../../../../redux/slices/slice'
import { useDispatch } from 'react-redux'

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

  /// onClick //

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
  /// onClick //

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
