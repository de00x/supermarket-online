import { ISets } from '../../../../../SidebarPages/SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { addItem, minusItem, removeItem } from '../../../../../../../redux/slices/slice'
import { IBasketIControllersProps } from '../types/BasketItem.types'
import { useDispatch } from 'react-redux'

const BasketIControllers = ({ count }: IBasketIControllersProps) => {
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
  return { minusProduct, plusProduct, deleteProduct }
}
export default BasketIControllers
