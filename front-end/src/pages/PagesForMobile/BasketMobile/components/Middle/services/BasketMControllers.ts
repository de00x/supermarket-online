import { clearItems } from '../../../../../../redux/slices/slice'
import { IBasketMControllersProps } from '../types/BasketM.types'
import { useDispatch } from 'react-redux'

const BasketMControllers = ({ items }: IBasketMControllersProps) => {
  const dispatch = useDispatch()
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const clearAllProducts = (): void => {
    dispatch(clearItems())
  }
  return { totalCount, clearAllProducts }
}
export default BasketMControllers
