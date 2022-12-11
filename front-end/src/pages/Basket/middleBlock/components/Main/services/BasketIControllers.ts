import { ISets } from '../../../../../SidebarMenuPages/SidebarSets/middleBlock/components/Main/types/SSets.types'
import { addItem, minusItem, removeItem } from '../../../../../../redux/slices/slice'
import { IBIControllersProps } from '../types/BasketItem.types'

const BasketIControllers = ({ count, dispatch }: IBIControllersProps) => {
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
