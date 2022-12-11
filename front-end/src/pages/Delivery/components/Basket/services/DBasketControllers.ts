import { ISets } from '../../../../SidebarMenuPages/SidebarSets/middleBlock/components/Main/types/SSets.types'
import { addItem, minusItem, removeItem } from '../../../../../redux/slices/slice'
import { IBControllersProps } from '../types/Basket.types'

const DBasketControllers = ({ count, dispatch }: IBControllersProps) => {
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
  return { minusProduct, plusProduct }
}
export default DBasketControllers
