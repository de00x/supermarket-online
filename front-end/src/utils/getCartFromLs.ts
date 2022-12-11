import { ISets } from '../pages/SidebarMenuPages/SidebarSets/middleBlock/components/Main/types/SSets.types'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLS = (): any => {
  const data = localStorage.getItem('cart')
  const items = data != null ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items: items as ISets[],
    totalPrice,
  }
}
