import { selectCart } from '../../../../../redux/slices/selectors'
import { useAppSelector } from '../../../../../hooks/hooks'

const BasketControllers = () => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  return { totalCount, items, totalPrice }
}
export default BasketControllers
